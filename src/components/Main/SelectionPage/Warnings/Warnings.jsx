import React from 'react'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import './Warnings.css'

const Warnings = () => (
  <div className="selection-error-container">
    <div className="selection-error-header">
      <WarningRoundedIcon className="selection-warning-icon" />
      1 Warning
    </div>
    <div>
      <ul>
        <li>We are unable to find recommendations for your search (7190 - 9913)</li>
      </ul>
    </div>
  </div>
)
export default Warnings
