import React from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import WavyDivider from '../components/WavyDivider'
import FloatingCTA from '../components/FloatingCTA'
import GetQuoteModal from '../components/GetQuoteModal'
import { useState } from 'react'
import { FiAward, FiUsers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'

const stats = [
  { icon: FiAward, number: '10+', label: 'Years Experience' },
  { icon: FiUsers, number: '1000+', label: 'Happy Customers' },
  { icon: FiTrendingUp, number: '500+', label: 'Projects Completed' },
  { icon: FiCheckCircle, number: '98%', label: 'Satisfaction Rate' }
]

const values = [
  {
    title: 'Quality First',
    description: 'We use only premium quality materials and follow industry best practices to ensure lasting results.'
  },
  {
    title: 'Customer Focus',
    description: 'Your satisfaction is our priority. We work closely with you to bring your vision to life.'
  },
  {
    title: 'Timely Delivery',
    description: 'We respect your time and commit to completing projects within the agreed timeframe.'
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden costs. We provide detailed quotes and maintain transparency throughout the project.'
  }
]

const About = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-navy-900 to-navy-800 dark:from-black dark:to-navy-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-4">
          <ScrollAnimation type="fade">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Transforming spaces with excellence and precision
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <WavyDivider />

      {/* Story Section */}
      <section className="py-16 bg-white dark:bg-navy-900">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation type="fade">
              <h2 className="heading-primary text-gray-900 dark:text-white mb-6 text-center">
                Our Story
              </h2>
            </ScrollAnimation>
            <ScrollAnimation type="slideUp" delay={0.2}>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Founded over a decade ago, Decorator & Painters has been at the forefront of 
                interior finishing and decoration services across India. What started as a small 
                team of passionate craftsmen has grown into a trusted name in the industry.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We specialize in POP ceiling work, wall putty, PU polish, and comprehensive 
                interior finishing solutions. Our commitment to quality, attention to detail, 
                and customer satisfaction has earned us the trust of over 1000 satisfied customers.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Today, we continue to innovate and improve our services, staying updated with 
                the latest techniques and materials to deliver exceptional results that exceed 
                our clients' expectations.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-navy-900/50">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} type="zoom" delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                    <stat.icon className="text-primary-600 dark:text-primary-400" size={32} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-navy-900">
        <div className="section-container">
          <ScrollAnimation type="fade" className="text-center mb-12">
            <h2 className="heading-primary text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <ScrollAnimation key={index} type="slideUp" delay={index * 0.1}>
                <div className="bg-gray-50 dark:bg-navy-800 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollAnimation type="slideUp" className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get in touch to discuss your project
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Free Quote
          </button>
        </div>
      </ScrollAnimation>

      <FloatingCTA />
      <GetQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </>
  )
}

export default About

