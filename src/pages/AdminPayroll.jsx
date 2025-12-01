import React, { useState, useEffect } from 'react'
import { FiPlus, FiTrash2, FiDollarSign, FiCalendar, FiUser, FiSave, FiCheck, FiX } from 'react-icons/fi'

const AdminPayroll = () => {
  const [workers, setWorkers] = useState([])
  const [activeTab, setActiveTab] = useState('overview') // overview, attendance, payments, workers
  const [showAddWorker, setShowAddWorker] = useState(false)
  const [newWorker, setNewWorker] = useState({ name: '', dailyRate: '' })
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentForm, setPaymentForm] = useState({ workerId: '', amount: '', type: 'advance', note: '' })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWorkers = localStorage.getItem('payroll_workers')
    if (savedWorkers) {
      setWorkers(JSON.parse(savedWorkers))
    }
  }, [])

  // Save data to localStorage whenever workers change
  useEffect(() => {
    localStorage.setItem('payroll_workers', JSON.stringify(workers))
  }, [workers])

  const handleAddWorker = (e) => {
    e.preventDefault()
    if (!newWorker.name || !newWorker.dailyRate) return

    const worker = {
      id: Date.now().toString(),
      name: newWorker.name,
      dailyRate: parseFloat(newWorker.dailyRate),
      attendance: {}, // { "YYYY-MM-DD": "present" | "half" | "absent" }
      payments: []    // [{ id, date, amount, type, note }]
    }

    setWorkers([...workers, worker])
    setNewWorker({ name: '', dailyRate: '' })
    setShowAddWorker(false)
  }

  const handleDeleteWorker = (id) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
      setWorkers(workers.filter(w => w.id !== id))
    }
  }

  const handleAttendanceChange = (workerId, status) => {
    setWorkers(workers.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          attendance: {
            ...w.attendance,
            [selectedDate]: status
          }
        }
      }
      return w
    }))
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (!paymentForm.workerId || !paymentForm.amount) return

    setWorkers(workers.map(w => {
      if (w.id === paymentForm.workerId) {
        return {
          ...w,
          payments: [
            ...w.payments,
            {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              amount: parseFloat(paymentForm.amount),
              type: paymentForm.type,
              note: paymentForm.note
            }
          ]
        }
      }
      return w
    }))

    setPaymentForm({ workerId: '', amount: '', type: 'advance', note: '' })
    alert('Payment recorded successfully!')
  }

  // Calculations
  const calculateStats = (worker) => {
    let earned = 0
    Object.entries(worker.attendance).forEach(([_, status]) => {
      if (status === 'present') earned += worker.dailyRate
      if (status === 'half') earned += worker.dailyRate / 2
    })

    const paid = worker.payments.reduce((sum, p) => sum + p.amount, 0)
    
    return {
      earned,
      paid,
      balance: earned - paid
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'overview' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'attendance' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'payments' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setActiveTab('workers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'workers' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              {workers.map(worker => {
                const stats = calculateStats(worker)
                return (
                  <tr key={worker.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{worker.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">₹{worker.dailyRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">₹{stats.earned}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">₹{stats.paid}</td>
                    <td className={`px-6 py-4 whitespace-nowrap font-bold ${stats.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                      ₹{stats.balance}
                    </td>
                  </tr>
                )
              })}
              {workers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No workers added yet. Go to "Manage Workers" to add one.
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
            {workers.map(worker => (
              <div key={worker.id} className="border rounded-lg p-4 flex flex-col justify-between">
                <div className="mb-3">
                  <h3 className="font-medium text-lg text-black">{worker.name}</h3>
                  <p className="text-sm text-gray-500">Rate: ₹{worker.dailyRate}/day</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAttendanceChange(worker.id, 'present')}
                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                      worker.attendance[selectedDate] === 'present'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleAttendanceChange(worker.id, 'half')}
                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                      worker.attendance[selectedDate] === 'half'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                    }`}
                  >
                    Half Day
                  </button>
                  <button
                    onClick={() => handleAttendanceChange(worker.id, 'absent')}
                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                      worker.attendance[selectedDate] === 'absent'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
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
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
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
                <FiDollarSign /> Record Payment
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {workers.flatMap(w => w.payments.map(p => ({ ...p, workerName: w.name })))
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(payment => (
                  <div key={payment.id} className="bg-white border rounded-lg p-3 flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-medium text-gray-900">{payment.workerName}</p>
                      <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()} • {payment.type}</p>
                      {payment.note && <p className="text-xs text-gray-400 mt-1">"{payment.note}"</p>}
                    </div>
                    <span className="font-bold text-red-600">-₹{payment.amount}</span>
                  </div>
                ))}
                {workers.every(w => w.payments.length === 0) && (
                  <p className="text-gray-500 text-center py-8">No transactions recorded yet.</p>
                )}
            </div>
          </div>
        </div>
      )}

      {/* WORKERS TAB */}
      {activeTab === 'workers' && (
        <div>
          <div className="flex justify-between items-center mb-6">
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
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddWorker(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Worker
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-4">
            {workers.map(worker => (
              <div key={worker.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    <FiUser />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{worker.name}</h4>
                    <p className="text-sm text-gray-500">Rate: ₹{worker.dailyRate}/day</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteWorker(worker.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  title="Delete Worker"
                >
                  <FiTrash2 />
                </button>
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
