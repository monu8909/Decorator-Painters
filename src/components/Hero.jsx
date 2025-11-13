import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Sample before/after images - in production, these would come from props or API
  const slides = [
    {
      before: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      title: 'Living Room Transformation',
      description: 'Modern design meets classic elegance'
    },
    {
      before: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      after: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      title: 'Kitchen Renovation',
      description: 'Bright and functional space'
    },
    {
      before: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
      after: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
      title: 'Bedroom Makeover',
      description: 'Your personal sanctuary'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white" aria-label="Hero section with before and after transformations">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="heading-primary text-white mb-4">
              Transform Your Home with Professional Decoration & Painting
            </h1>
            <p className="text-xl mb-6 text-gray-100">
              Expert craftsmanship, quality materials, and attention to detail. 
              We bring your vision to life.
            </p>
            <a
              href="#contact"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-block"
            >
              Book a Free Consultation
            </a>
          </div>

          {/* Before/After Slider */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl bg-gray-900">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="min-w-full relative">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative">
                        <img
                          src={slide.before}
                          alt={`Before: ${slide.title}`}
                          className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded font-semibold">
                          Before
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={slide.after}
                          alt={`After: ${slide.title}`}
                          className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded font-semibold">
                          After
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4">
                      <h3 className="text-lg font-semibold">{slide.title}</h3>
                      <p className="text-sm text-gray-300">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous slide"
              >
                <FiChevronLeft size={24} className="text-gray-900" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next slide"
              >
                <FiChevronRight size={24} className="text-gray-900" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white bg-opacity-50'
                  } focus:outline-none focus:ring-2 focus:ring-white`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

