import React from 'react'
import ScrollAnimation from '../components/ScrollAnimation'
import WavyDivider from '../components/WavyDivider'
import ServiceCard from '../components/ServiceCard'
import FloatingCTA from '../components/FloatingCTA'
import GetQuoteModal from '../components/GetQuoteModal'
import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

const allServices = [
  {
    id: 'pop-ceiling',
    title: 'POP Ceiling Work',
    description: 'Professional Plaster of Paris ceiling designs that add elegance and sophistication to your interiors. We offer custom designs, LED integration, and waterproof solutions.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    features: [
      'Custom design consultation',
      'Waterproof POP solutions',
      'LED light integration',
      'Quick and clean installation',
      'Maintenance-free finish'
    ],
    details: 'Our POP ceiling work transforms ordinary rooms into extraordinary spaces. We use premium quality materials and skilled craftsmen to create stunning ceiling designs that complement your interior decor.'
  },
  {
    id: 'wall-putty',
    title: 'Wall Putty Work',
    description: 'Smooth and flawless wall finishing with premium quality putty for a perfect base for painting. Ensures long-lasting results and prevents cracks.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop',
    features: [
      'Premium quality putty',
      'Crack prevention',
      'Smooth finish',
      'Long-lasting results',
      'Ready for painting'
    ],
    details: 'Proper wall putty application is crucial for a flawless paint finish. Our expert team ensures every wall is perfectly prepared, creating a smooth surface that enhances paint adhesion and longevity.'
  },
  {
    id: 'pu-polish',
    title: 'PU Polish Furniture',
    description: 'Expert PU polish services to restore and protect your wooden furniture with a glossy, durable finish that resists scratches and UV damage.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    features: [
      'High-gloss finish',
      'UV protection',
      'Scratch resistant',
      'Easy maintenance',
      'Restores old furniture'
    ],
    details: 'Our PU polish service brings new life to your wooden furniture. The polyurethane coating provides excellent protection against wear, moisture, and UV rays while maintaining a beautiful glossy appearance.'
  },
  {
    id: 'interior-painting',
    title: 'Interior Painting',
    description: 'Transform your living spaces with our professional interior painting services using premium paints and expert color consultation.',
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=600&fit=crop',
    features: [
      'Premium quality paints',
      'Color consultation',
      'Clean and neat finish',
      'Eco-friendly options',
      'Multiple coats for durability'
    ],
    details: 'We offer comprehensive interior painting services with a wide range of premium paints. Our color consultants help you choose the perfect shades to create the ambiance you desire.'
  },
  {
    id: 'exterior-painting',
    title: 'Exterior Painting',
    description: 'Weather-resistant exterior painting solutions that protect and beautify your home\'s exterior while withstanding harsh weather conditions.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    features: [
      'Weather-resistant paints',
      'UV protection',
      'Waterproof coating',
      'Long-lasting finish',
      'Professional surface preparation'
    ],
    details: 'Protect your home\'s exterior with our weather-resistant painting solutions. We use premium exterior paints that withstand sun, rain, and pollution while maintaining their vibrant colors.'
  },
  {
    id: 'texture-work',
    title: 'Texture Work',
    description: 'Add depth and character to your walls with our professional texture work services, including Venetian plaster, stucco, and custom textures.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    features: [
      'Multiple texture options',
      'Custom designs',
      'Venetian plaster',
      'Stucco finishes',
      'Modern and traditional styles'
    ],
    details: 'Texture work adds visual interest and depth to your walls. We offer various texture options from subtle to dramatic, helping you create unique interior spaces.'
  },
  {
    id: 'waterproofing',
    title: 'Waterproofing',
    description: 'Comprehensive waterproofing solutions for bathrooms, terraces, and basements to prevent water damage and leakage issues.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    features: [
      'Bathroom waterproofing',
      'Terrace waterproofing',
      'Basement protection',
      'Leakage repair',
      'Long-term guarantee'
    ],
    details: 'Protect your property from water damage with our professional waterproofing services. We use high-quality materials and proven techniques to ensure complete protection.'
  },
  {
    id: 'wood-polish',
    title: 'Wood Polish & Varnish',
    description: 'Expert wood polishing and varnishing services to enhance and protect your wooden surfaces, furniture, and fixtures.',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=600&fit=crop',
    features: [
      'Natural wood finish',
      'Varnish application',
      'Furniture restoration',
      'Door and window polish',
      'Maintenance services'
    ],
    details: 'Our wood polish and varnish services bring out the natural beauty of wood while providing protection. We work with all types of wood and finishes.'
  }
]

const Services = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-navy-900 to-navy-800 dark:from-black dark:to-navy-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-4">
          <ScrollAnimation type="fade">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Comprehensive interior and exterior finishing solutions
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <WavyDivider />

      {/* Services Grid */}
      <section className="py-16 bg-white dark:bg-navy-900">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <div key={service.id}>
                <ServiceCard service={service} index={index} />
                <button
                  onClick={() => {
                    setSelectedService(service)
                    setIsQuoteModalOpen(true)
                  }}
                  className="mt-4 w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all transform hover:scale-105"
                >
                  Get Quote for {service.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-navy-900/50">
        <div className="section-container">
          <ScrollAnimation type="fade" className="text-center mb-12">
            <h2 className="heading-primary text-gray-900 dark:text-white mb-4">
              Our Process
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Consultation', desc: 'Free consultation to understand your requirements' },
              { step: '02', title: 'Quote', desc: 'Detailed quote with transparent pricing' },
              { step: '03', title: 'Execution', desc: 'Professional execution with quality materials' },
              { step: '04', title: 'Completion', desc: 'Final inspection and handover with warranty' }
            ].map((item, index) => (
              <ScrollAnimation key={index} type="slideUp" delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.desc}
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
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free consultation and detailed quote
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
      <GetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => {
          setIsQuoteModalOpen(false)
          setSelectedService(null)
        }}
        initialService={selectedService?.title}
      />
    </>
  )
}

export default Services

