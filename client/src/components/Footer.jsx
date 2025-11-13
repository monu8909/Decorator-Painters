import React from 'react'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Perfect Finish</h3>
            <p className="text-gray-400">
              Expert in POP, Putty & PU Finishing Work Across India. 
              Premium interior finishing with flawless results.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <FiPhone className="text-primary-500" aria-hidden="true" />
                <a href="tel:+919876543210" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-primary-500" aria-hidden="true" />
                <a href="mailto:info@perfectfinish.com" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  info@perfectfinish.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-primary-500" aria-hidden="true" />
                <span>Serving across India - Mumbai, Delhi, Bangalore & more</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                  Book Now
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Perfect Finish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

