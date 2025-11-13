import React from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import SpecializedServices from '../components/SpecializedServices'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import BookingForm from '../components/BookingForm'

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <SpecializedServices />
      <Gallery />
      <Testimonials />
      <BookingForm />
    </>
  )
}

export default HomePage

