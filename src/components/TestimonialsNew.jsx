import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'

const TestimonialsNew = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      text: 'Excellent POP ceiling work! The team was professional and completed the project on time. The finish is flawless and exactly as we wanted.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      service: 'POP False Ceiling'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Delhi, NCR',
      rating: 5,
      text: 'Amazing putty work! Our walls are now perfectly smooth and ready for painting. The quality of materials used is top-notch.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      service: 'Wall Putty'
    },
    {
      id: 3,
      name: 'Amit Patel',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      text: 'Outstanding PU polish work on our wooden furniture. The glossy finish is beautiful and the coating is very durable.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      service: 'PU Coating'
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      location: 'Bangalore, Karnataka',
      rating: 5,
      text: 'Complete interior finishing done perfectly! From POP ceiling to putty and painting, everything was handled professionally.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      service: 'Complete Finishing'
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section id="testimonials" className="py-20 bg-white" aria-labelledby="testimonials-heading">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="testimonials-heading" className="heading-primary text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See what our satisfied clients have to say about our work
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl h-full flex flex-col justify-center"
              >
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FiStar key={i} className="w-6 h-6 text-primary-500 fill-primary-500" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-gray-700 text-center mb-8 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary-200"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonials[currentIndex].location}</p>
                    <p className="text-primary-600 text-sm font-medium mt-1">
                      {testimonials[currentIndex].service}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary-500'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsNew

