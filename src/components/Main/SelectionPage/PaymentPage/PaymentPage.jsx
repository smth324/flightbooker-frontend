import React, { useEffect } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import PercentIcon from '@mui/icons-material/Percent'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import promotionsService from '../../../../services/promotionsService'
import { useFormData, useFormDataUpdate } from '../../../../contexts/FormDataContext'
import './PaymentPage.css'
import { changeNotification } from '../../../../reducers/notificationReducer'

const PaymentPage = ({ submitBooking, booking, setBooking }) => {
  const formData = useFormData()
  const setFormData = useFormDataUpdate()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!formData.flight) {
      navigate('/selection/select/times')
    }
  }, [])
  const applyPromo = async (event) => {
    event.preventDefault()
    const code = await promotionsService.check({
      code: booking.promotionCode,
    })
    if (!code) {
      dispatch(changeNotification('Error: Promo code invalid', 5))
      return
    }
    setFormData((prev) => ({ ...prev, promoPercent: code.promotionPercent }))
    dispatch(changeNotification('Success: Promo code applied', 5))
  }
  return (
    <>
      <div className="selection-page-promotion-container">
        <header className="selection-page-promotion-header">
          <PercentIcon className="selection-page-promotion-icon" />
          Promotion Code
        </header>
        <form className="selection-page-promotion-main">
          <label htmlFor="promotion-input" className="selection-page-promotion-label">Do you have a promotion code?</label>
          <input id="promotion-input" className="selection-page-promotion-input" value={booking.promotionCode} onChange={(event) => setBooking((prev) => ({ ...prev, promotionCode: event.target.value }))} />
          <button type="submit" className="selection-page-promotion-submit" onClick={applyPromo}>Apply</button>
        </form>
      </div>
      <div>Payment</div>
      <div>
        pay
      </div>
      <div className="selection-page-continue-container">
        <button type="submit" className="selection-page-continue-btn" onClick={submitBooking}>
          CONTINUE
          <ArrowRightIcon />
        </button>
      </div>
    </>
  )
}
export default PaymentPage
