import React from 'react'
import { useLocation } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check'
import './Status.css'

const Status = () => {
  const status = useLocation().pathname.split('/')[2]
  return (
    <div className="selection-status-header">
      <div className="selection-status-header-inner">
        <div className="selection-status-text">
          1. SELECT - FLIGHTS
        </div>
        <div className="selection-status-symbols-container">
          <div data-status="1" className={`selection-status-symbols ${status === 'select' ? 'selection-status-symbols-current' : ''}`}>
            {status === 'book' || status === 'pay' ? <CheckIcon style={{ paddingRight: 3 }} /> : null}
            Select
          </div>
          <div data-status="2" className={`selection-status-symbols ${status === 'book' ? 'selection-status-symbols-current' : ''}`}>
            { status === 'pay' ? <CheckIcon style={{ paddingRight: 3 }} /> : null}
            Book
          </div>
          <div data-status="3" className={`selection-status-symbols ${status === 'pay' ? 'selection-status-symbols-current' : ''}`}>
            Pay
          </div>
        </div>
      </div>
    </div>
  )
}

export default Status
