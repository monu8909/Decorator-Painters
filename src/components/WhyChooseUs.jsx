import React from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiClock, FiDollarSign, FiTool } from 'react-icons/fi'

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Skilled Team',
      description: 'Experienced craftsmen with years of expertise in POP, Putty, and PU work'
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: 'On-Time Work',
      description: 'We respect deadlines and complete projects within the promised timeframe'
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: 'Affordable Pricing',
      description: 'Competitive rates without compromising on quality and materials'
    },
    {
      icon: <FiTool className="w-8 h-8" />,
      title: 'Modern Tools',
      description: 'Latest equipment and techniques for superior finishing results'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden" aria-labelledby="why-choose-heading">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="why-choose-heading" className="heading-primary text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We combine expertise, quality materials, and dedication to deliver exceptional results
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { number: '500+', label: 'Projects Completed' },
            { number: '10+', label: 'Years Experience' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '50+', label: 'Expert Craftsmen' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs

