import React from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import './PaymentPage.css'

const PaymentPage = ({ submitBooking }) => (
  <>
    <div>Payment</div>
    <div>
      pay
    </div>
    <div className="selection-page-continue-container">
      <button type="button" className="selection-page-continue-btn" onClick={submitBooking}>
        CONTINUE
        <ArrowRightIcon />
      </button>
    </div>
  </>
)
export default PaymentPage
