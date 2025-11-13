import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const fallbackImage = 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop&q=80'

  const videoUrl = '../../dist/assets/vypt890qbdrma0ctfjv9v20prg_result_.mp4'

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
           
            <source
              src={videoUrl}
              type="video/mp4"
            />
          </video>
        
        {/* Fallback Image */}
        {/* <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            videoError || !videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${fallbackImage})`
          }}
        /> */}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-800/70 to-navy-900/80 dark:from-black/70 dark:via-black/60 dark:to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Transform Your Space with
            <span className="block text-primary-400 mt-2">
              Perfect Finishes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Professional POP ceiling work, wall putty, PU polish, and interior finishing services
            that bring your vision to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/contact"
              className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full font-semibold text-lg hover:from-primary-700 hover:to-primary-600 transition-all transform hover:scale-105 shadow-2xl flex items-center space-x-2"
            >
              <span>Get Free Quote</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/services"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30 hover:border-white/50"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default HeroSection

