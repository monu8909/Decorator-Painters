import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiMessageCircle, FiX } from 'react-icons/fi'

const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCall = () => {
    window.location.href = 'tel:+919876543210'
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210', '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCall}
              className="flex items-center space-x-3 bg-gradient-to-r from-accent-600 to-accent-500 text-white px-6 py-3 rounded-full shadow-2xl hover:from-accent-700 hover:to-accent-600 transition-all"
            >
              <FiPhone size={20} />
              <span className="font-semibold">Call Now</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWhatsApp}
              className="flex items-center space-x-3 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-green-600 transition-all"
            >
              <FiMessageCircle size={20} />
              <span className="font-semibold">WhatsApp</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-4 rounded-full shadow-2xl flex items-center justify-center transition-all ${
          isExpanded
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-gradient-to-br from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white'
        }`}
        aria-label={isExpanded ? 'Close menu' : 'Open contact options'}
      >
        {isExpanded ? <FiX size={24} /> : <FiPhone size={24} />}
      </motion.button>
    </div>
  )
}

export default FloatingCTA

