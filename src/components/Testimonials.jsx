import React from 'react'
import { FiStar } from 'react-icons/fi'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Downtown Apartment',
      rating: 5,
      text: 'The team did an amazing job transforming our living room. Professional, clean, and on time. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    {
      name: 'Michael Chen',
      location: 'Suburban House',
      rating: 5,
      text: 'Excellent service from start to finish. They helped us choose the perfect colors and the finish is flawless.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      name: 'Emma Williams',
      location: 'Family Home',
      rating: 5,
      text: 'We had our entire house painted and couldn\'t be happier. Great communication and attention to detail throughout.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    }
  ]

  return (
    <section id="testimonials" className="py-16 bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="heading-primary">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

