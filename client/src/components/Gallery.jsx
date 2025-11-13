import React from 'react'
import ImageGallery from './ImageGallery'

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 bg-white" aria-labelledby="gallery-heading">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 id="gallery-heading" className="heading-primary">
            Our Work Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our recent projects and see the quality of our work.
          </p>
        </div>

        <ImageGallery />
      </div>
    </section>
  )
}

export default Gallery

