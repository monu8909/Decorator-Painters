import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FiDownload, FiRefreshCw, FiAlertCircle } from 'react-icons/fi'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import AdminPayroll from './AdminPayroll'

const AdminPage = () => {
  const [token, setToken] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('bookings') // 'bookings' or 'payroll'

  useEffect(() => {
    // Check if token is stored in localStorage
     localStorage.setItem('adminToken',123)
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
      const response = await axios.get('/api/bookings', {
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
          <p style="margin: 5px 0;"><strong>Number of Rooms:</strong> ${booking.numberOfRooms || 'Not specified'}</p>
          <p style="margin: 5px 0;"><strong>Preferred Start Date:</strong> ${booking.preferredStartDate || 'Not specified'}</p>
          <p style="margin: 5px 0;"><strong>Budget Range:</strong> ${booking.budgetRange || 'Not specified'}</p>
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
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <FiAlertCircle className="text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="heading-primary">Admin Dashboard</h1>
          <div className="flex gap-4">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'bookings' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('payroll')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'payroll' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
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
          </div>
        </div>

        {activeTab === 'payroll' ? (
          <AdminPayroll />
        ) : (
          <>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <FiAlertCircle className="text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

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
                          Rooms
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
                            {booking.numberOfRooms || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {booking.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => exportToPDF(booking)}
                              className="text-primary-600 hover:text-primary-900 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                            >
                              <FiDownload />
                              Export PDF
                            </button>
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
    </div>
  )
}

export default AdminPage

