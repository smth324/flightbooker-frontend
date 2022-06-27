import React from 'react'
import './ExplorerPopup.css'

const ExplorerPopup = () => (
  <div className="header-explore-popup">
    <div className="header-explore-popup-inner">
      <div className="header-explore-popup-inner-links">
        <ul className="header-explore-options">
          <li><a className="destination-links" href="https://www.philippineairlines.com/en/featureddestinations" target="_blank" rel="noreferrer">Featured Destinations</a></li>
          <li><a className="destination-links" href="https://www.philippineairlines.com/en/ph/Home/TravelInformation/FlightTimetable" target="_blank" rel="noreferrer">Flight Timetable</a></li>
        </ul>
      </div>
      <div className="header-explore-image-options">
        <div>
          <a className="destination-image-links" href="https://mabuhay.philippineairlines.com/city/cebu/" target="_blank" rel="noreferrer">
            <img alt="cebu" src="https://www.philippineairlines.com/en/~/media/newhomepage-david/cebu1.jpg" />
            Cebu, Philippines
          </a>
        </div>
        <div>
          <a className="destination-image-links" href="https://mabuhay.philippineairlines.com/city/davao/" target="_blank" rel="noreferrer">
            <img alt="cebu" src="https://www.philippineairlines.com/en/~/media/newhomepage-david/davao.jpg" />
            Davao, Philippines
          </a>
        </div>
        <div>
          <a className="destination-image-links" href="https://mabuhay.philippineairlines.com/city/singapore/" target="_blank" rel="noreferrer">
            <img alt="cebu" src="https://www.philippineairlines.com/en/~/media/newhomepage-david/singaporemarinabay.jpg" />
            Singapore, Singapore
          </a>
        </div>
        <div>
          <a className="destination-image-links" href="https://mabuhay.philippineairlines.com/city/los-angeles/" target="_blank" rel="noreferrer">
            <img alt="cebu" src="https://www.philippineairlines.com/en/~/media/newhomepage-david/losangelesstamonica.jpg" />
            Los Angeles, USA
          </a>
        </div>
        <div>
          <a className="destination-image-links" href="https://mabuhay.philippineairlines.com/city/auckland/" target="_blank" rel="noreferrer">
            <img alt="cebu" src="https://www.philippineairlines.com/en/~/media/newhomepage-david/auckland-nav.jpg" />
            Auckland, New Zealand
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default ExplorerPopup
