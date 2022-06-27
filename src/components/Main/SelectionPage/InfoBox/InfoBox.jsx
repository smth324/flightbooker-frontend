import React from 'react'
import InfoIcon from '@mui/icons-material/Info'
import './InfoBox.css'

const InfoBox = ({ message, className }) => (
  <div className={`selection-info-container ${className}`}>
    <div className="selection-info-header">
      <InfoIcon className="selection-info-icon" />
    </div>
    <div className="selection-info-text">
      {message}
    </div>
  </div>
)

export default InfoBox
