import React, { useState } from 'react'
import { Report } from '@mui/icons-material'
import './Advisory.css'

const Advisory = () => {
  const [advisoryMsg] = useState('FOR DOMESTIC FLIGHTS: NO VACCINATION, NO FLY (new DEPARTMENT OF TRANSPORTATION, Department Order No. 2022-001)')

  return (
    <div className="advisory-container">
      <div className="advisory-box-container">
        <div className="advisory-box">
          Visit our COVID-19 Travel Guide for the latest
          information on destinations and travel related updates
          <a href="https://www.philippineairlines.com/en/covid-19" className="advisory-box-btn">Visit Now</a>
        </div>
      </div>
      <div className="advisory-text">
        <Report className="advisory-report-svg" />
        ADVISORY
        <a className="advisory-text-link" href="asd">{advisoryMsg}</a>
      </div>
    </div>
  )
}

export default Advisory
