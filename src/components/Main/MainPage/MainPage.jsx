import React from 'react'
import BookFlightForm from './BookFlightForm'
import ImageCarousel from './ImageCarousel'
import Header from './Header'
import Advisory from './Advisory'
import logo from '../../../images/footer-logo.png'
import './MainPage.css'

const MainPage = ({ setFlights }) => (
  <div className="main-page">
    <Header />
    <Advisory />
    <ImageCarousel />
    <BookFlightForm setFlights={setFlights} />
    <div className="main-negative-spacer" />
    <div className="main-details-container">
      <div className="main-announcement">
        Find the latest updates on
        {' '}
        <a className="main-announcement-links" href="https://www.philippineairlines.com/en/TravelInformation/BeforeYouFly/BaggageInformation/BaggageAllowance" target="_blank" rel="noreferrer">baggage allowances</a>
        {' '}
        and other
        {' '}
        <a className="main-announcement-links" href="https://www.philippineairlines.com/en/faqs/taxesfeesandsurcharges" target="_blank" rel="noreferrer">service fees</a>
        .
        Please feel free to
        {' '}
        <a className="main-announcement-links" href="https://www.philippineairlines.com/en/aboutus/contactus" target="_blank" rel="noreferrer">contact us</a>
        {' '}
        for any questions or concerns regarding your travel experience.
      </div>
      <div className="main-options-container">
        <a className="main-options-box" href="https://www.alliedbankerstravelinsurance.com/pal/ph-en/home.html" target="_blank" rel="noreferrer">
          <div className="main-options-box-header">Travel Insurance Max</div>
          <br />
          Get comprehensive protection with Covid19
          coverage on your travels from/within the Philippines.
        </a>
        <a className="main-options-box" href="https://www.philippineairlines.com/en/ph/home/Travelextras/ChoiceSeatsNeighborFree" target="_blank" rel="noreferrer">
          <div className="main-options-box-header">Choice Seats Neighbor-Free</div>
          <br />
          Fly in maximum comfort with up to triple the space in Economy
        </a>
        <a className="main-options-box" href="https://www.philippineairlines.com/en/ph/home/mypalupgrade" target="_blank" rel="noreferrer">
          <div className="main-options-box-header">myPal Upgrade</div>
          <br />
          Bid for a flight update to Business Class or Premium Economy!
        </a>
      </div>
    </div>
    <footer className="main-footer-container">
      <div className="main-footer-list-container">
        <ul className="main-footer-list">
          <li className="main-footer-list-item"><a className="main-footer-list-link" href="https://www.philippineairlines.com/AboutUs/LegalNotices" target="_blank" rel="noreferrer">Legal Notices</a></li>
          <li className="main-footer-list-item"><a className="main-footer-list-link" href="https://www.philippineairlines.com/TravelInformation/FlightTimetable" target="_blank" rel="noreferrer">Timetable</a></li>
          <li className="main-footer-list-item"><a className="main-footer-list-link" href="https://www.philippineairlines.com/AboutUs/ContactUs" target="_blank" rel="noreferrer">Contact Us</a></li>
        </ul>
      </div>
      <div className="main-footer-logo-container">
        <img src={logo} alt="pal-logo" className="main-footer-logo" />
      </div>
    </footer>
  </div>
)

export default MainPage
