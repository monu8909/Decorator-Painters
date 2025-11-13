import React, { useState } from 'react'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const openLightbox = (index) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  // Sample images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600',
    'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600'
  ]

  const galleryImages = images || defaultImages

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => openLightbox(index)}
            className="relative overflow-hidden rounded-lg aspect-square group focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded p-2"
            aria-label="Close lightbox"
          >
            <FiX size={32} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded p-2"
            aria-label="Previous image"
          >
            <FiChevronLeft size={32} />
          </button>

          <div className="max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[selectedImage]}
              alt={`Gallery image ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded p-2"
            aria-label="Next image"
          >
            <FiChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  )
}

export default ImageGallery

