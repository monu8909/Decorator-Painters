import React from 'react'
import ServiceCard from './ServiceCard'

const Services = () => {
  const packages = [
    {
      title: 'Basic Package',
      description: 'Perfect for small spaces and touch-ups',
      features: [
        'Single room painting',
        'Basic color consultation',
        'Standard paint (1 coat)',
        'Cleanup included',
        '1-year warranty'
      ],
      price: 'From $500'
    },
    {
      title: 'Standard Package',
      description: 'Ideal for complete room makeovers',
      features: [
        'Up to 3 rooms painting',
        'Full color consultation',
        'Premium paint (2 coats)',
        'Minor wall repairs',
        'Cleanup included',
        '2-year warranty'
      ],
      price: 'From $1,500',
      popular: true
    },
    {
      title: 'Premium Package',
      description: 'Complete home transformation',
      features: [
        'Unlimited rooms',
        'Design consultation',
        'Premium paint (2 coats)',
        'Wall repairs & prep work',
        'Decorative finishes available',
        'Cleanup included',
        '3-year warranty',
        'Priority scheduling'
      ],
      price: 'From $3,500'
    }
  ]

  return (
    <section id="services" className="bg-gray-50 py-16" aria-labelledby="services-heading">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="heading-primary">
            Our Service Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the package that fits your needs. All packages include professional 
            craftsmanship and quality materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <ServiceCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

