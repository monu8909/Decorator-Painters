import React from 'react'

const ServiceCard = ({ title, description, features, price, popular = false }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 relative ${popular ? 'border-2 border-primary-500 transform scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}
      
      <h3 className="heading-secondary text-center mb-4">{title}</h3>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      
      <ul className="space-y-3 mb-6" role="list">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg 
              className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="text-center">
        <div className="text-3xl font-bold text-primary-600 mb-4">
          {price}
        </div>
        <a
          href="#contact"
          className="btn-primary w-full block text-center"
        >
          Get Started
        </a>
      </div>
    </div>
  )
}

export default ServiceCard

