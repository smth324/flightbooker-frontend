import React from 'react'
import BookFlightForm from './BookFlightForm'
import ImageCarousel from './ImageCarousel'
import Header from './Header'
import Advisory from './Advisory'
import './MainPage.css'

const MainPage = ({ setFlights }) => (
  <div className="main-page">
    <Header />
    <Advisory />
    <ImageCarousel />
    <BookFlightForm setFlights={setFlights} />
    <div style={{ marginTop: -500 }} />
  </div>
)

export default MainPage
