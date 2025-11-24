import React from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'

const ServicesNew = () => {
  const services = [
    {
      id: 1,
      title: 'POP False Ceiling',
      description: 'Modern false ceiling designs with POP for elegant interiors',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop',
        after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
      },
      features: ['Custom designs', 'LED integration', 'Fire-resistant', 'Durable finish']
    },
    {
      id: 2,
      title: 'Wall Putty Application',
      description: 'Professional wall putty for smooth, flawless surfaces',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop',
        after: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop'
      },
      features: ['Crack filling', 'Surface leveling', 'Waterproof options', 'Paint-ready']
    },
    {
      id: 3,
      title: 'PU Coating & Polish',
      description: 'Premium PU coating for wood and walls with glossy finishes',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop',
        after: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop'
      },
      features: ['Wood polishing', 'Wall coating', 'Glossy finish', 'Long-lasting']
    },
    {
      id: 4,
      title: 'Decorative Molding',
      description: 'Elegant POP moldings and cornices for architectural beauty',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop',
        after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
      },
      features: ['Custom patterns', 'Cornice work', 'Architectural details', 'Premium finish']
    },
    {
      id: 5,
      title: 'Wall Texture Work',
      description: 'Creative wall textures and finishes using POP and putty',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop',
        after: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop'
      },
      features: ['Textured finishes', 'Modern designs', 'Custom patterns', 'Smooth application']
    },
   
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <section id="services" className="py-20 bg-white" aria-labelledby="services-heading">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="services-heading" className="heading-primary text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive interior finishing solutions with premium quality and expert craftsmanship
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Before/After Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <div className="flex-1 bg-red-500/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded text-center font-semibold">
                    Before
                  </div>
                  <div className="flex-1 bg-green-500/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded text-center font-semibold">
                    After
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <FiCheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center text-primary-600 font-semibold text-sm hover:text-primary-700 group/link"
                >
                  Get Quote
                  <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesNew

