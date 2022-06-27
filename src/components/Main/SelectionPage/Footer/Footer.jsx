import React from 'react'
import logo from '../../../../images/footer-logo.png'
import './Footer.css'

const Footer = () => (
  <footer className="selection-footer-container">
    <div className="selection-footer-list-container">
      <ul className="selection-footer-list">
        <li className="selection-footer-list-item"><a className="selection-footer-list-link" href="https://www.philippineairlines.com/AboutUs/LegalNotices" target="_blank" rel="noreferrer">Legal Notices</a></li>
        <li className="selection-footer-list-item"><a className="selection-footer-list-link" href="https://www.philippineairlines.com/TravelInformation/FlightTimetable" target="_blank" rel="noreferrer">Timetable</a></li>
        <li className="selection-footer-list-item"><a className="selection-footer-list-link" href="https://www.philippineairlines.com/AboutUs/ContactUs" target="_blank" rel="noreferrer">Contact Us</a></li>
      </ul>
    </div>
    <div className="selection-footer-logo-container">
      <img src={logo} alt="pal-logo" className="selection-footer-logo" />
    </div>
  </footer>
)

export default Footer
