import { useState, useEffect } from 'react'
import { FiPlus, FiTrash2, FiDollarSign, FiCalendar, FiUser, FiSave, FiCheck, FiX, FiEdit } from 'react-icons/fi'
import axios from 'axios'
import { API } from '../apiconfig/Apiconfig'
import Swal from 'sweetalert2'
import moment from 'moment';
const AdminPayroll = () => {
  const [workers, setWorkers] = useState([])
  const [activeTab, setActiveTab] = useState('overview') // overview, attendance, payments, workers
  const [showAddWorker, setShowAddWorker] = useState(false)
  const [newWorker, setNewWorker] = useState({ name: '', dailyRate: '', mobileNumber: '' })
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentForm, setPaymentForm] = useState({ workerId: '', amount: '', type: 'advance', note: '' })
  const [editingWorkerId, setEditingWorkerId] = useState(null)




  const handleAddWorker = async (e) => {
    e.preventDefault()
    try {
      // Validate mobile number
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex?.test(newWorker?.mobileNumber)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Mobile Number",
          text: "Please enter a valid 10-digit Indian mobile number (starting with 6-9).",
        });
        return;
      }

      let response;
      if (editingWorkerId) {
        response = await axios.put(`${API?.USER_UPDATE}/${editingWorkerId}`, newWorker)
      } else {
        response = await axios.post(API?.USER_REGISTER, newWorker)
      }

      console.log("response--->", response);
      if (response?.status === 201 || response?.status === 200) {
        Swal.fire({
          title: editingWorkerId ? "Worker updated successfully!" : "Worker added successfully!",
          icon: "success",
          draggable: true
        }).then((result) => {
          getWorkersList()

        });
        setNewWorker({ name: '', dailyRate: '', mobileNumber: '' })
        setEditingWorkerId(null)
        setShowAddWorker(false)

      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message,
      });
      console.log("error", error);
    }
  }

  const handleDeleteWorker = async (id) => {
    console.log("id", id);
    try {
      const response = await axios?.delete(`${API?.DELETE_WORKER}/${id}`)
      console.log("response--->", response);
      if (response?.status === 200) {
        Swal.fire({
          title: "Worker deleted successfully!",
          icon: "success",
          draggable: true
        }).then((result) => {
          getWorkersList()

        });

      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message,
      });
      console.log("error", error);
    }

  }

  const handleEditWorker = (id) => {
    const worker = workers.find(w => w._id === id || w.id === id);
    if (worker) {
      setNewWorker({
        name: worker.name,
        dailyRate: worker.dailyRate,
        mobileNumber: worker.mobileNumber
      })
      setEditingWorkerId(id)
      setShowAddWorker(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAttendanceChange = async (workerId, status) => {
    try {
      const response = await axios.post(API?.ATTENDANCE, {
        userId: workerId,
        date: selectedDate,
        status
      })

      if (response?.status === 200 || response?.status === 201) {
        Swal.fire({
          title: "Attendance marked successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        getWorkersList()
      }
    } catch (error) {
      console.error("Error marking attendance:", error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Failed to mark attendance",
      });
    }
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    if (!paymentForm?.workerId || !paymentForm?.amount) return

    try {
      console.log("paymentForm--->", paymentForm);

      const response = await axios.post(API?.PAYMENT, {
        userId: paymentForm?.workerId,
        amount: parseFloat(paymentForm?.amount),
        type: paymentForm?.type,
        note: paymentForm?.note,
        date: new Date().toISOString()
      })

      if (response?.status === 200 || response?.status === 201) {
        setPaymentForm({ workerId: '', amount: '', type: 'advance', note: '' })
        Swal.fire({
          title: "Payment recorded successfully!",
          icon: "success",
          draggable: true
        });
        getWorkersList()
      }
    } catch (error) {
      console.error("Error recording payment:", error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Failed to record payment",
      });
    }
  }

  // Calculations
  const calculateStats = (worker) => {
    console.log("workerdsdsds", worker);

    let earned = 0
    if (worker?.attendance) {
      worker?.attendance?.forEach((data) => {
        if (data?.status === 'Present') earned += (worker?.dailyRate || 0)
        if (data?.status === 'Half Day') earned += (worker?.dailyRate || 0) / 2
      })
    }

    const paid = (worker?.payments || []).reduce((sum, p) => sum + (p?.amount || 0), 0)
    console.log("paidsdsdsds--->", earned,
      paid,
      earned - paid);

    return {
      earned,
      paid,
      balance: earned - paid
    }
  }

  const getWorkersList = async () => {
    try {
      const response = await axios.get(API?.GET_WORKERS);
      if (response?.status === 200) {
        setWorkers(response?.data)
      }


    } catch (error) {
      console.error("Error fetching workers:", error)
    }
  }
  useEffect(() => {
    getWorkersList()
  }, [])
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'attendance' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'payments' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          Payments
        </button>
        <button
          onClick={() => setActiveTab('workers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'workers' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          Manage Workers
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Earned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workers?.map((worker) => {
                const stats = calculateStats(worker)
                return (
                  <tr key={worker?._id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{worker?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">₹{worker?.dailyRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">₹{stats?.earned}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">₹{stats?.paid}</td>
                    <td className={`px-6 py-4 whitespace-nowrap font-bold ${stats?.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                      ₹{stats?.balance}
                    </td>

                  </tr>
                )
              })}
              {workers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No workers added yet. Go to Manage Workers to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ATTENDANCE TAB */}
      {activeTab === 'attendance' && (
        <div>
          <div className="mb-6 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workers?.map(worker => {
              const currentStatus = worker?.attendance?.find(a => a.date.split('T')[0] === selectedDate)?.status;
              return (
                <div key={worker?._id} className="border rounded-lg p-4 flex flex-col justify-between">
                  <div className="mb-3">
                    <h3 className="font-medium text-lg text-black">{worker?.name}</h3>
                    <p className="text-sm text-gray-500">Rate: ₹{worker?.dailyRate}/day</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAttendanceChange(worker?._id, 'Present')}
                      className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${currentStatus === 'Present'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                        }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(worker?._id, 'Half Day')}
                      className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${currentStatus === 'Half Day'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                        }`}
                    >
                      Half Day
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(worker?._id, 'Absent')}
                      className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${currentStatus === 'Absent'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                        }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              )
            })}
            {workers.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">No workers found.</p>
            )}
          </div>
        </div>
      )}

      {/* PAYMENTS TAB */}
      {activeTab === 'payments' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4 text-black">Record New Payment</h3>
            <form onSubmit={handlePaymentSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Worker</label>
                <select
                  value={paymentForm.workerId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, workerId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  required
                >
                  <option value="">Select a worker</option>
                  {workers?.map(w => (
                    <option key={w?._id} value={w?._id}>{w?.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={paymentForm.type}
                  onChange={(e) => setPaymentForm({ ...paymentForm, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="advance">Advance</option>
                  <option value="salary">Salary Payment</option>
                  <option value="bonus">Bonus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                <input
                  type="text"
                  value={paymentForm.note}
                  onChange={(e) => setPaymentForm({ ...paymentForm, note: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="e.g. Weekly advance"
                />
              </div>
              <button type="submit" className="w-full btn-primary flex justify-center items-center gap-2">
                ₹ Record Payment
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg text-black font-medium mb-4">Recent Transactions</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {workers?.flatMap(w => (w.payments || []).map(p => ({ ...p, workerName: w.name })))
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(payment => (
                  <div key={payment.id} className="bg-white border rounded-lg p-3 flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-medium text-gray-900">{payment.workerName}</p>
                      <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()} • {payment.type}</p>
                      {payment.note && <p className="text-xs text-gray-400 mt-1">{payment.note}</p>}
                    </div>
                    <span className="font-bold text-red-600">-₹{payment.amount}</span>
                  </div>
                ))}
              {workers.every(w => (w.payments || []).length === 0) && (
                <p className="text-gray-500 text-center py-8">No transactions recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WORKERS TAB */}
      {activeTab === 'workers' && (
        <div>
          <div className="flex justify-between items-center mb-6 flex-wrap">
            <h3 className="text-lg font-medium">Worker List</h3>
            <button
              onClick={() => setShowAddWorker(!showAddWorker)}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <FiPlus /> Add Worker
            </button>
          </div>

          {showAddWorker && (
            <form onSubmit={handleAddWorker} className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newWorker.name}
                    onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate (₹)</label>
                  <input
                    type="number"
                    value={newWorker.dailyRate}
                    onChange={(e) => setNewWorker({ ...newWorker, dailyRate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={newWorker.mobileNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setNewWorker({ ...newWorker, mobileNumber: value })
                      }
                    }}
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddWorker(false)
                    setEditingWorkerId(null)
                    setNewWorker({ name: '', dailyRate: '', mobileNumber: '' })
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingWorkerId ? 'Update Worker' : 'Save Worker'}
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-4">
            {workers?.map(worker => (
              <div key={worker.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    <FiUser />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{worker?.name}</h4>
                    <p className="text-sm text-gray-500">{worker?.mobileNumber}</p>
                    <p className="text-sm text-gray-500">Rate: ₹{worker?.dailyRate}/day</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditWorker(worker?._id)}
                    className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                    title="Edit Worker"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteWorker(worker?._id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Delete Worker"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
            {workers.length === 0 && !showAddWorker && (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No workers added yet.</p>
                <button onClick={() => setShowAddWorker(true)} className="text-primary-600 hover:underline mt-2">
                  Add your first worker
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPayroll
