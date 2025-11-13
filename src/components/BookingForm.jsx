import React, { useState } from 'react'
import axios from 'axios'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    numberOfRooms: '',
    preferredStartDate: '',
    budgetRange: ''
  })

  const [photos, setPhotos] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + photos.length > 10) {
      setErrors(prev => ({
        ...prev,
        photos: 'Maximum 10 photos allowed'
      }))
      return
    }
    setPhotos(prev => [...prev, ...files])
    if (errors.photos) {
      setErrors(prev => ({
        ...prev,
        photos: ''
      }))
    }
  }

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (formData.numberOfRooms && (isNaN(formData.numberOfRooms) || formData.numberOfRooms < 1)) {
      newErrors.numberOfRooms = 'Number of rooms must be a positive number'
    }

    if (formData.preferredStartDate) {
      const selectedDate = new Date(formData.preferredStartDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.preferredStartDate = 'Start date cannot be in the past'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const formDataToSend = new FormData()
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key])
        }
      })
      
      photos.forEach(photo => {
        formDataToSend.append('photos', photo)
      })

      const response = await axios.post('/api/bookings', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          numberOfRooms: '',
          preferredStartDate: '',
          budgetRange: ''
        })
        setPhotos([])
        
        // Scroll to success message
        setTimeout(() => {
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 bg-white" aria-labelledby="contact-heading">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 id="contact-heading" className="heading-primary">
              Book Your Consultation
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3" role="alert">
              <FiCheckCircle className="text-green-600 flex-shrink-0" size={24} aria-hidden="true" />
              <div>
                <p className="font-semibold text-green-800">Booking submitted successfully!</p>
                <p className="text-sm text-green-700">We'll contact you soon to confirm your appointment.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3" role="alert">
              <FiAlertCircle className="text-red-600 flex-shrink-0" size={24} aria-hidden="true" />
              <div>
                <p className="font-semibold text-red-800">Error submitting booking</p>
                <p className="text-sm text-red-700">Please try again or contact us directly.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Project Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.address ? 'true' : 'false'}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <p id="address-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Number of Rooms */}
            <div>
              <label htmlFor="numberOfRooms" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Rooms
              </label>
              <input
                type="number"
                id="numberOfRooms"
                name="numberOfRooms"
                value={formData.numberOfRooms}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.numberOfRooms ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.numberOfRooms ? 'true' : 'false'}
                aria-describedby={errors.numberOfRooms ? 'numberOfRooms-error' : undefined}
              />
              {errors.numberOfRooms && (
                <p id="numberOfRooms-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.numberOfRooms}
                </p>
              )}
            </div>

            {/* Preferred Start Date */}
            <div>
              <label htmlFor="preferredStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Start Date
              </label>
              <input
                type="date"
                id="preferredStartDate"
                name="preferredStartDate"
                value={formData.preferredStartDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.preferredStartDate ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.preferredStartDate ? 'true' : 'false'}
                aria-describedby={errors.preferredStartDate ? 'preferredStartDate-error' : undefined}
              />
              {errors.preferredStartDate && (
                <p id="preferredStartDate-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.preferredStartDate}
                </p>
              )}
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select budget range</option>
                <option value="under-1000">Under $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="over-10000">Over $10,000</option>
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos (Optional, max 10)
              </label>
              <input
                type="file"
                id="photos"
                name="photos"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-describedby={errors.photos ? 'photos-error' : 'photos-help'}
              />
              {errors.photos && (
                <p id="photos-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.photos}
                </p>
              )}
              <p id="photos-help" className="mt-1 text-sm text-gray-500">
                Accepted formats: JPG, PNG, GIF, WEBP (max 10MB per file)
              </p>
              
              {/* Photo Preview */}
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default BookingForm

