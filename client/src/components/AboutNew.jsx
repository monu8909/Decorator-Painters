import React from 'react'
import { motion } from 'framer-motion'
import { FiHome, FiTool, FiShield } from 'react-icons/fi'

const AboutNew = () => {
  const services = [
    {
      id: 'pop',
      icon: <FiHome className="w-12 h-12" />,
      title: 'POP Work',
      subtitle: 'Plaster of Paris',
      description: 'False ceiling, decorative molding, smooth finish',
      details: [
        'False ceiling installation',
        'Decorative moldings & cornices',
        'Wall textures & finishes',
        'Architectural elements',
        'Custom design patterns'
      ],
      color: 'from-accent-500 to-accent-700',
      bgColor: 'bg-accent-50',
      textColor: 'text-accent-700'
    },
    {
      id: 'putty',
      icon: <FiTool className="w-12 h-12" />,
      title: 'Putty Work',
      subtitle: 'Wall Putty Application',
      description: 'Wall preparation, smooth painting base',
      details: [
        'Crack filling and gap sealing',
        'Surface leveling and smoothing',
        'Waterproof putty options',
        'Premium quality materials',
        'Ready for paint application'
      ],
      color: 'from-primary-500 to-primary-700',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-700'
    },
    {
      id: 'pu',
      icon: <FiShield className="w-12 h-12" />,
      title: 'PU Coating',
      subtitle: 'Polyurethane Polish',
      description: 'Glossy finish, wood and wall protection',
      details: [
        'Wood polishing & protection',
        'Wall coating & finishing',
        'Glossy & matte finishes',
        'Water-resistant coating',
        'Long-lasting durability'
      ],
      color: 'from-amber-500 to-amber-700',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
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
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="about-heading">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="about-heading" className="heading-primary text-gray-900 mb-4">
            About Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We specialize in premium interior finishing work, bringing expertise in POP, Putty, and PU coating 
            to transform your spaces with flawless finishes.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className={`${service.bgColor} rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 shadow-lg`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold ${service.textColor} mb-2`}>
                  {service.title}
                </h3>
                <p className="text-sm font-semibold text-gray-600 mb-3">{service.subtitle}</p>
                <p className="text-gray-700 mb-6">{service.description}</p>

                {/* Details */}
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <span className={`w-1.5 h-1.5 rounded-full ${service.textColor} bg-current mt-2 mr-2 flex-shrink-0`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated GIF/Image Section */}
        <motion.div
          className="mt-16 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop"
            alt="Professional applying putty to wall"
            className="w-full h-64 md:h-96 object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutNew

