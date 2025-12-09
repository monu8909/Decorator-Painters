import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../apiconfig/Apiconfig';

const BookingPage = () => {
    const [token, setToken] = useState('')
    useEffect(() => {
        // Check if token is stored in localStorage
        localStorage.setItem('adminToken', 123)
        const storedToken = localStorage.getItem('adminToken')
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        serviceType: '',
        preferredStartDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await axios.post(API.CREATE_BOOKING, formData, {
                headers: {
                    'x-admin-token': token
                }
            });
            setMessage({ type: 'success', text: 'Booking request submitted successfully! We will contact you soon.' });
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                serviceType: '',
                preferredStartDate: ''
            });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to submit booking. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary-600 py-4 px-12">
                    <h2 className="text-2xl font-bold text-white text-center">Request a Quote</h2>
                </div>

                <form onSubmit={handleSubmit} className="py-8 px-6 space-y-6">
                    {message.text && (
                        <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            name="address"
                            id="address"
                            rows="3"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                        <div>
                            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
                            <select
                                name="serviceType"
                                id="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">Select Service...</option>
                                <option value="Interior Painting">Interior Painting</option>
                                <option value="Exterior Painting">Exterior Painting</option>
                                <option value="Wall Preparation & Repairs">Wall Preparation & Repairs</option>
                                <option value="Color Consultation">Color Consultation</option>
                                <option value="Cleanup & Disposal">Cleanup & Disposal</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="preferredStartDate" className="block text-sm font-medium text-gray-700">Preferred Start Date</label>
                        <input
                            type="date"
                            name="preferredStartDate"
                            id="preferredStartDate"
                            value={formData.preferredStartDate}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
