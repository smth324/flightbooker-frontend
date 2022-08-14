import React from 'react'
import { useLocation } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check'
import './Status.css'

const Status = () => {
  const location = useLocation().pathname
  const status = location.split('/')[2]
  let statusHeader = '1. SELECT - DATES'
  switch (location) {
  case '/selection/select/calendar':
    statusHeader = '1. SELECT - DATES'
    break
  case '/selection/select/times':
    statusHeader = '1. SELECT - FLIGHTS'
    break
  case '/selection/book/passengers':
    statusHeader = '2. BOOK - PASSENGER INFORMATION'
    break
  case '/selection/book/seats':
    statusHeader = '2. BOOK - CHOOSE SEATS'
    break
  default:
    statusHeader = '3. PAYMENT - PAY'
    break
  }
  return (
    <div className="selection-status-header">
      <div className="selection-status-header-inner">
        <div className="selection-status-text">
          {statusHeader}
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
