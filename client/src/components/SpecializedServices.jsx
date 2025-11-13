import React from 'react'
import { FiCheckCircle, FiTool, FiHome } from 'react-icons/fi'

const SpecializedServices = () => {
  const services = [
    {
      id: 'putty',
      title: 'Wall Putty Work',
      subtitle: 'Premium Surface Preparation',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
      description: 'Professional wall putty application for smooth, flawless surfaces ready for painting. We use high-quality putty materials that ensure long-lasting results.',
      features: [
        'Crack filling and gap sealing',
        'Surface leveling and smoothing',
        'Waterproof putty options',
        'Premium quality materials',
        'Expert application techniques',
        'Ready for paint application'
      ],
      benefits: [
        'Smooth finish',
        'Prevents paint peeling',
        'Durable surface',
        'Cost-effective solution'
      ],
      icon: <FiTool className="w-8 h-8" />
    },
    {
      id: 'pop',
      title: 'POP (Plaster of Paris) Work',
      subtitle: 'Decorative & Functional Solutions',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      description: 'Expert POP work for false ceilings, decorative moldings, cornices, and architectural elements. Transform your space with elegant POP designs.',
      features: [
        'False ceiling installation',
        'Decorative moldings & cornices',
        'Wall textures & finishes',
        'Architectural elements',
        'Custom design patterns',
        'Professional finishing'
      ],
      benefits: [
        'Modern aesthetics',
        'Custom designs',
        'Durable construction',
        'Fire-resistant properties'
      ],
      icon: <FiHome className="w-8 h-8" />
    },
    {
      id: 'piu',
      title: 'Primer & Undercoating',
      subtitle: 'Foundation for Perfect Paint',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      description: 'Professional primer application ensures better paint adhesion, uniform color, and enhanced durability. Essential step for long-lasting paint jobs.',
      features: [
        'Surface priming',
        'Stain blocking',
        'Moisture protection',
        'Paint adhesion enhancement',
        'Color uniformity',
        'Extended paint life'
      ],
      benefits: [
        'Better paint coverage',
        'Prevents stains',
        'Saves paint costs',
        'Professional finish'
      ],
      icon: <FiCheckCircle className="w-8 h-8" />
    }
  ]

  return (
    <section id="specialized-services" className="bg-white py-16 md:py-20" aria-labelledby="specialized-services-heading">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 id="specialized-services-heading" className="heading-primary">
            Specialized Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Professional construction and preparation services using premium materials. 
            We ensure quality at every step for a flawless finish.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 bg-primary-500 text-white p-3 rounded-lg shadow-lg">
                  {service.icon}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-primary-200 text-sm font-medium">{service.subtitle}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                    Services Include:
                  </h4>
                  <ul className="space-y-2" role="list">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits Section */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                    Key Benefits:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className="mt-6 block w-full text-center btn-primary"
                >
                  Get Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8 md:p-10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Specialized Services?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTool className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Craftsmen</h4>
                <p className="text-sm text-gray-600">Skilled professionals with years of experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Premium Materials</h4>
                <p className="text-sm text-gray-600">Only the best quality materials and brands</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHome className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Guaranteed Results</h4>
                <p className="text-sm text-gray-600">Satisfaction guaranteed with warranty coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecializedServices

