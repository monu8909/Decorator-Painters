import React from 'react'
import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-white" role="contentinfo">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Decorator & Painters</h3>
            <p className="text-gray-400 mb-4">
              Expert in POP, Putty & PU Finishing Work Across India. 
              Premium interior finishing with flawless results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>POP Ceiling Work</li>
              <li>Wall Putty Work</li>
              <li>PU Polish Furniture</li>
              <li>Interior Painting</li>
              <li>Exterior Painting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <FiPhone className="text-primary-500 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+919876543210" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-primary-500 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@decoratorpainters.com" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-colors">
                  info@decoratorpainters.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="text-primary-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <span>Serving across India - Mumbai, Delhi, Bangalore & more</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Decorator & Painters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

