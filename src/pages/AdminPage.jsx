import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FiDownload, FiRefreshCw, FiAlertCircle, FiPlus, FiX } from 'react-icons/fi'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import AdminPayroll from './AdminPayroll'
import { API } from '../apiconfig/Apiconfig'

const AdminPage = () => {
  const [token, setToken] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('bookings') // 'bookings' or 'payroll'
  const [showAddModal, setShowAddModal] = useState(false)
  const [newBooking, setNewBooking] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    preferredStartDate: ''
  })

  useEffect(() => {
    // Check if token is stored in localStorage
    localStorage.setItem('adminToken', 123)
    const storedToken = localStorage.getItem('adminToken')
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
      fetchBookings(storedToken)
    }
  }, [])

  const handleTokenSubmit = (e) => {
    e.preventDefault()
    if (token.trim()) {
      localStorage.setItem('adminToken', token)
      setIsAuthenticated(true)
      fetchBookings(token)
    }
  }

  const fetchBookings = async (authToken) => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(API?.BOOKING, {
        headers: {
          'x-admin-token': authToken
        }
      })
      setBookings(response.data.bookings || [])
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid admin token. Please check your token.')
        setIsAuthenticated(false)
        localStorage.removeItem('adminToken')
      } else {
        setError('Failed to fetch bookings. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(API?.CREATE_BOOKING, newBooking)
      setShowAddModal(false)
      setNewBooking({
        name: '',
        email: '',
        phone: '',
        address: '',
        serviceType: '',
        preferredStartDate: ''
      })
      fetchBookings(token)
    } catch (err) {
      setError('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    setLoading(true)
    try {
      await axios.patch(`${API.UPDATE_BOOKING_STATUS}/${id}/status`, { status: newStatus }, {
        headers: {
          'x-admin-token': token
        }
      })
      fetchBookings(token)
    } catch (err) {
      setError('Failed to update booking status. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const exportToPDF = async (booking) => {
    try {
      // Create a temporary div with the quote content
      const quoteContent = document.createElement('div')
      quoteContent.style.width = '210mm'
      quoteContent.style.padding = '20mm'
      quoteContent.style.fontFamily = 'Arial, sans-serif'
      quoteContent.style.backgroundColor = 'white'
      quoteContent.style.color = 'black'

      quoteContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 28px; margin-bottom: 10px;">Decorator & Painters</h1>
          <p style="font-size: 14px; color: #666;">Professional Home Services</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 15px;">QUOTE / ESTIMATE</h2>
          <p style="margin: 5px 0;"><strong>Quote ID:</strong> ${booking.id}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 18px; margin-bottom: 15px;">Client Information</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${booking.name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${booking.email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${booking.phone}</p>
          <p style="margin: 5px 0;"><strong>Address:</strong> ${booking.address}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 18px; margin-bottom: 15px;">Project Scope</h3>
          <p style="margin: 5px 0;"><strong>Service Type:</strong> ${booking.serviceType || 'Not specified'}</p>
          <p style="margin: 5px 0;"><strong>Preferred Start Date:</strong> ${booking.preferredStartDate || 'Not specified'}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 18px; margin-bottom: 15px;">Services Checklist</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 8px 0;">☐ Interior Painting</li>
            <li style="margin: 8px 0;">☐ Exterior Painting</li>
            <li style="margin: 8px 0;">☐ Wall Preparation & Repairs</li>
            <li style="margin: 8px 0;">☐ Color Consultation</li>
            <li style="margin: 8px 0;">☐ Cleanup & Disposal</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 18px; margin-bottom: 15px;">Material & Labor Estimate</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px;">Materials (Paint, Primer, Supplies)</td>
              <td style="text-align: right; padding: 8px;">TBD</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px;">Labor</td>
              <td style="text-align: right; padding: 8px;">TBD</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px;">Additional Services</td>
              <td style="text-align: right; padding: 8px;">TBD</td>
            </tr>
            <tr style="font-weight: bold; font-size: 16px;">
              <td style="padding: 8px;">Total Estimate</td>
              <td style="text-align: right; padding: 8px;">TBD</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #333;">
          <p style="margin: 10px 0;"><strong>Terms & Conditions:</strong></p>
          <p style="margin: 5px 0; font-size: 12px;">• This is an estimate, final pricing may vary based on actual work required</p>
          <p style="margin: 5px 0; font-size: 12px;">• Valid for 30 days from quote date</p>
          <p style="margin: 5px 0; font-size: 12px;">• Payment terms: 50% deposit, 50% upon completion</p>
          <p style="margin: 5px 0; font-size: 12px;">• Warranty: See contract template for details</p>
        </div>
        
        <div style="margin-top: 50px;">
          <div style="display: flex; justify-content: space-between;">
            <div style="width: 45%;">
              <p style="border-top: 1px solid #333; padding-top: 5px; margin-top: 60px;">Client Signature</p>
            </div>
            <div style="width: 45%;">
              <p style="border-top: 1px solid #333; padding-top: 5px; margin-top: 60px;">Company Representative</p>
            </div>
          </div>
        </div>
      `

      document.body.appendChild(quoteContent)

      // Convert to canvas and then to PDF
      const canvas = await html2canvas(quoteContent, {
        scale: 2,
        useCORS: true,
        logging: false
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`quote-${booking.id}.pdf`)

      // Clean up
      document.body.removeChild(quoteContent)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Admin Login</h1>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div>
              <label htmlFor="adminToken" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Token
              </label>
              <input
                type="password"
                id="adminToken"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter admin token"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        <div className="flex justify-between items-center mb-6 flex-wrap">
          <h1 className="heading-primary">Admin Dashboard</h1>
          <div className="flex gap-4 flex-wrap">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'bookings' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('payroll')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'payroll' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Payroll
              </button>
            </div>
            {activeTab === 'bookings' && (
              <button
                onClick={() => fetchBookings(token)}
                disabled={loading}
                className="btn-secondary flex items-center gap-2"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            )}
            {activeTab === 'bookings' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <FiPlus />
                Add Booking
              </button>
            )}
          </div>
        </div>

        {activeTab === 'payroll' ? (
          <AdminPayroll />
        ) : (
          <>


            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600">No bookings found.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>{booking.email}</div>
                            <div className="text-xs">{booking.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {booking.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.serviceType || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {booking.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => exportToPDF(booking)}
                              className="text-primary-600 hover:text-primary-900 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded mr-2"
                            >
                              <FiDownload />
                              PDF
                            </button>
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                                  className="text-green-600 hover:text-green-900 text-xs px-2 py-1 border border-green-600 rounded mr-1"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                  className="text-red-600 hover:text-red-900 text-xs px-2 py-1 border border-red-600 rounded"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => handleStatusUpdate(booking._id, 'completed')}
                                className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 border border-blue-600 rounded"
                              >
                                Complete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Add New Booking</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateBooking} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newBooking.name}
                    onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newBooking.email}
                    onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    value={newBooking.serviceType}
                    onChange={(e) => setNewBooking({ ...newBooking, serviceType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="">Select Service...</option>
                    <option value="Interior Painting">Interior Painting</option>
                    <option value="Exterior Painting">Exterior Painting</option>
                    <option value="Wall Preparation & Repairs">Wall Preparation & Repairs</option>
                    <option value="Color Consultation">Color Consultation</option>
                    <option value="Cleanup & Disposal">Cleanup & Disposal</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    required
                    rows="2"
                    value={newBooking.address}
                    onChange={(e) => setNewBooking({ ...newBooking, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newBooking.preferredStartDate}
                    onChange={(e) => setNewBooking({ ...newBooking, preferredStartDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                >
                  {loading ? 'Creating...' : 'Create Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage

