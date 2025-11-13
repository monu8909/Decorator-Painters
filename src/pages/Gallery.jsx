import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollAnimation from '../components/ScrollAnimation'
import WavyDivider from '../components/WavyDivider'
import FloatingCTA from '../components/FloatingCTA'
import GetQuoteModal from '../components/GetQuoteModal'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const galleryImages = [
  {
    id: 1,
    title: 'Multi-Layered POP Ceiling Design',
    category: 'pop-ceiling',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
    description: 'Geometric and organic shapes with integrated LED lighting'
  },
  {
    id: 2,
    title: 'Elegant False Ceiling with Cove Lighting',
    category: 'pop-ceiling',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    description: 'Sophisticated multi-tiered design with warm LED strips'
  },
  {
    id: 3,
    title: 'Modern POP Ceiling with Blue LED',
    category: 'pop-ceiling',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop',
    description: 'Contemporary design with integrated blue LED spotlights'
  },
  {
    id: 4,
    title: 'Luxury Ceiling with Wood Accents',
    category: 'pop-ceiling',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop',
    description: 'White POP ceiling with brown wooden panels and cove lighting'
  },
  {
    id: 5,
    title: 'Circular POP Ceiling Design',
    category: 'pop-ceiling',
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&h=800&fit=crop',
    description: 'Concentric circular layers with central light fixture'
  },
  {
    id: 6,
    title: 'Rectangular Recessed Ceiling',
    category: 'pop-ceiling',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&h=800&fit=crop',
    description: 'Multi-tiered rectangular design with decorative medallion'
  },
  {
    id: 7,
    title: 'Kitchen Ceiling with Integrated Lighting',
    category: 'pop-ceiling',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    description: 'Modern kitchen ceiling with LED strips and recessed lights'
  },
  {
    id: 8,
    title: 'Wall Putty Application',
    category: 'wall-putty',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&h=800&fit=crop',
    description: 'Professional wall putty work for smooth finish'
  },
  {
    id: 9,
    title: 'Wall Putty Work in Progress',
    category: 'wall-putty',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&h=800&fit=crop',
    description: 'Expert craftsmen applying premium quality putty'
  },
  {
    id: 10,
    title: 'Interior Painting Work',
    category: 'interior-painting',
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&h=800&fit=crop',
    description: 'Professional interior painting with premium paints'
  },
  {
    id: 11,
    title: 'Painting Tools and Materials',
    category: 'interior-painting',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&h=800&fit=crop',
    description: 'Quality painting equipment for flawless finish'
  },
  {
    id: 12,
    title: 'PU Polish on Wooden Furniture',
    category: 'pu-polish',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop',
    description: 'High-gloss PU polish protecting wooden surfaces'
  },
  {
    id: 13,
    title: 'Exterior Painting',
    category: 'exterior-painting',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    description: 'Weather-resistant exterior paint application'
  },
  {
    id: 14,
    title: 'Texture Work on Walls',
    category: 'texture-work',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop',
    description: 'Custom wall texture designs for unique interiors'
  },
  {
    id: 15,
    title: 'Hall Ceiling with Decorative Elements',
    category: 'pop-ceiling',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
    description: 'Elegant hall ceiling with brown accents and lighting'
  }
]

const categories = ['All', 'pop-ceiling', 'wall-putty', 'pu-polish', 'interior-painting', 'exterior-painting', 'texture-work']

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    let newIndex
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-navy-900 to-navy-800 dark:from-black dark:to-navy-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-4">
          <ScrollAnimation type="fade">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Showcasing our finest work and transformations
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <WavyDivider />

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-navy-900">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50 dark:bg-navy-900/50">
        <div className="section-container">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="relative group cursor-pointer overflow-hidden rounded-xl bg-white dark:bg-navy-800 shadow-lg"
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/90 text-sm">{image.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollAnimation type="slideUp" className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Like What You See?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's create something amazing for your space
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Free Quote
          </button>
        </div>
      </ScrollAnimation>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-6xl w-full"
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <FiX size={24} />
                </button>
                
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <FiChevronLeft size={24} />
                </button>
                
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <FiChevronRight size={24} />
                </button>

                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg"
                />
                
                <div className="mt-4 text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-white/80">{selectedImage.description}</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FloatingCTA />
      <GetQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </>
  )
}

export default Gallery

