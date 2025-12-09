import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ScrollAnimation from '../components/ScrollAnimation'
import WavyDivider from '../components/WavyDivider'
import FloatingCTA from '../components/FloatingCTA'
import GetQuoteModal from '../components/GetQuoteModal'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi'
import { API } from '../apiconfig/Apiconfig'

const Contact = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
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
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(API.CREATE_BOOKING, formData, {
        headers: {
          'x-admin-token': token
        }
      });
      alert('Booking request submitted successfully! We will contact you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        serviceType: '',
        preferredStartDate: ''
      })
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit booking. Please try again.')
    }
  }

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Phone',
      content: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: FiMail,
      title: 'Email',
      content: 'info@decoratorpainters.com',
      link: 'mailto:info@decoratorpainters.com'
    },
    {
      icon: FiMapPin,
      title: 'Address',
      content: '123 Main Street, City, State 123456',
      link: null
    },
    {
      icon: FiClock,
      title: 'Working Hours',
      content: 'Mon - Sat: 9:00 AM - 7:00 PM',
      link: null
    }
  ]

  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-navy-900 to-navy-800 dark:from-black dark:to-navy-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-4">
          <ScrollAnimation type="fade">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Get in touch with us for your project needs
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <WavyDivider />

      {/* Contact Info */}
      <section className="py-16 bg-white dark:bg-navy-900">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <ScrollAnimation key={index} type="zoom" delay={index * 0.1}>
                <div className="bg-gray-50 dark:bg-navy-800 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                    <info.icon className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.content}
                    </p>
                  )}
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ScrollAnimation type="slideRight">
                <div>
                  <h2 className="heading-secondary text-gray-900 dark:text-white mb-6">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Fill out the form below and we all get back to you as soon as possible.
                    You can also call us directly or use WhatsApp for immediate assistance.
                  </p>

                  <div className="space-y-4">
                    <button
                      onClick={() => window.location.href = 'tel:+919876543210'}
                      className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <FiPhone size={20} />
                      <span>Call Now</span>
                    </button>

                    <button
                      onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                      className="w-full px-6 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <FiSend size={20} />
                      <span>WhatsApp Us</span>
                    </button>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation type="slideLeft">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Type *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Service...</option>
                      <option value="Interior Painting">Interior Painting</option>
                      <option value="Exterior Painting">Exterior Painting</option>
                      <option value="Wall Preparation & Repairs">Wall Preparation & Repairs</option>
                      <option value="Color Consultation">Color Consultation</option>
                      <option value="Cleanup & Disposal">Cleanup & Disposal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Start Date
                    </label>
                    <input
                      type="date"
                      name="preferredStartDate"
                      value={formData.preferredStartDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>



                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <FiSend size={20} />
                    <span>Send Message</span>
                  </button>
                </form>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-navy-900/50">
        <div className="section-container">
          <ScrollAnimation type="fade" className="text-center mb-8">
            <h2 className="heading-primary text-gray-900 dark:text-white mb-4">
              Find Us
            </h2>
          </ScrollAnimation>
          <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200 dark:bg-navy-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        </div>
      </section>

      <FloatingCTA />
      <GetQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </>
  )
}

export default Contact

