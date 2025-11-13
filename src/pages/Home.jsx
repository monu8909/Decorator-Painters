import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ScrollAnimation from '../components/ScrollAnimation'
import WavyDivider from '../components/WavyDivider'
import ServiceCard from '../components/ServiceCard'
import TestimonialCarousel from '../components/TestimonialCarousel'
import FloatingCTA from '../components/FloatingCTA'
import GetQuoteModal from '../components/GetQuoteModal'
import { useState } from 'react'
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'

const services = [
  {
    id: 'pop-ceiling',
    title: 'POP Ceiling Work',
    description: 'Professional Plaster of Paris ceiling designs that add elegance and sophistication to your interiors.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    features: ['Custom designs', 'Waterproof solutions', 'LED integration', 'Quick installation']
  },
  {
    id: 'wall-putty',
    title: 'Wall Putty Work',
    description: 'Smooth and flawless wall finishing with premium quality putty for a perfect base for painting.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop',
    features: ['Premium quality', 'Crack prevention', 'Smooth finish', 'Long-lasting']
  },
  {
    id: 'pu-polish',
    title: 'PU Polish Furniture',
    description: 'Expert PU polish services to restore and protect your wooden furniture with a glossy, durable finish.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    features: ['High-gloss finish', 'UV protection', 'Scratch resistant', 'Easy maintenance']
  },
  {
    id: 'interior-painting',
    title: 'Interior Painting',
    description: 'Transform your living spaces with our professional interior painting services using premium paints.',
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=600&fit=crop',
    features: ['Premium paints', 'Color consultation', 'Clean finish', 'Eco-friendly options']
  }
]

const whyChooseUs = [
  '10+ Years of Experience',
  '1000+ Happy Customers',
  'Premium Quality Materials',
  'On-Time Project Completion',
  'Free Consultation & Quote',
  '5-Year Warranty on Work'
]

const Home = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <>
      <HeroSection />
      <WavyDivider />

      {/* About Section */}
      <ScrollAnimation type="fade" className="section-container py-16 bg-white dark:bg-navy-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-primary text-gray-900 dark:text-white mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We are a leading wall finishing and interior decoration company in India, specializing in 
            POP ceiling work, wall putty, PU polish, and comprehensive interior finishing solutions. 
            With over a decade of experience, we've transformed thousands of homes and commercial spaces.
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full font-semibold hover:from-primary-700 hover:to-primary-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Free Quote
          </button>
        </div>
      </ScrollAnimation>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-navy-900/50">
        <div className="section-container">
          <ScrollAnimation type="fade" className="text-center mb-12">
            <h2 className="heading-primary text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive interior finishing solutions for your home and office
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <ScrollAnimation type="slideUp" className="text-center mt-12">
            <a
              href="/services"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold text-lg hover:text-primary-700 dark:hover:text-primary-300"
            >
              View All Services
            </a>
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-16 bg-white dark:bg-navy-900">
        <div className="section-container">
          <ScrollAnimation type="fade" className="text-center mb-12">
            <h2 className="heading-primary text-gray-900 dark:text-white mb-4">
              Our Recent Work
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Showcasing our expertise in POP ceiling, wall finishing, and interior decoration
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                id: 1,
                title: 'Modern POP Ceiling with LED',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
                category: 'POP Ceiling',
                description: 'Multi-layered geometric design with integrated lighting'
              },
              {
                id: 2,
                title: 'Elegant False Ceiling Design',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                category: 'POP Ceiling',
                description: 'Sophisticated ceiling with cove lighting and decorative accents'
              },
              {
                id: 3,
                title: 'Wall Putty Application',
                image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop',
                category: 'Wall Putty',
                description: 'Smooth wall finishing for perfect paint base'
              },
              {
                id: 4,
                title: 'Professional Painting Work',
                image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=600&fit=crop',
                category: 'Interior Painting',
                description: 'Premium quality interior painting with attention to detail'
              },
              {
                id: 5,
                title: 'Contemporary Ceiling Design',
                image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
                category: 'POP Ceiling',
                description: 'Modern geometric patterns with warm LED lighting'
              },
              {
                id: 6,
                title: 'Kitchen Ceiling with Integrated Lighting',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
                category: 'POP Ceiling',
                description: 'Functional and beautiful ceiling design for modern kitchens'
              }
            ].map((item, index) => (
              <ScrollAnimation key={item.id} type="zoom" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation type="slideUp" className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold text-lg hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              View Full Gallery
              <FiArrowRight className="ml-2" />
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-navy-900/50">
        <div className="section-container">
          <ScrollAnimation type="fade" className="text-center mb-12">
            <h2 className="heading-primary text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <ScrollAnimation key={index} type="zoom" delay={index * 0.1}>
                <div className="bg-white dark:bg-navy-800 p-6 rounded-xl flex items-center space-x-4 shadow-md hover:shadow-lg transition-shadow">
                  <FiCheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0" size={24} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <ScrollAnimation type="slideUp" className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free consultation and quote today!
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

export default Home

