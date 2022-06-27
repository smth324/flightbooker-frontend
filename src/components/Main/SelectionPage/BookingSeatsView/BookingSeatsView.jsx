import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import StarIcon from '@mui/icons-material/Star'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useDispatch } from 'react-redux'
import InfoBox from '../InfoBox'
import SeatPicker from './SeatPicker'
import './BookingSeatsView.css'
import { changeNotification } from '../../../../reducers/notificationReducer'
import { useFormData } from '../../../../contexts/FormDataContext'

const message = (
  <div>
    Reserved seats are not guaranteed and may be changed for operational, safety, or legal reasons.
    If your seat changes, we will provide the best seat available. Passengers who purchase Choice
    Seats or Advance Seat Selection will be provided a similar seat. Otherwise, paid Choice
    Seats/Advance Seat Selection fee will be refunded. Read more about Choice Seats and
    Advance Seat Selection Terms and Conditions. For each flight, select a passenger and
    choose his seat.
  </div>
)

const BookingSeatsView = ({ customers, setCustomers, layout }) => {
  const [currPassenger, setCurrPassenger] = useState({ ...customers[0], index: 0 })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useFormData()

  useEffect(() => {
    if (!formData.flight) {
      navigate('/selection/select/times')
    }
  }, [])

  const occupied = customers.map((x) => x?.seatId?.id)

  const selectPassenger = (passenger, index) => {
    setCurrPassenger({ ...passenger, index })
  }

  const clearSeats = () => {
    setCustomers((x) => x.map((cust) => {
      const edited = { ...cust }
      delete edited.seatId
      return edited
    }))
  }

  const nextPage = () => {
    if (customers.every((x) => x?.seatId)) {
      navigate('/selection/pay')
      return
    }
    dispatch(changeNotification('Error: Please pick a seat', 5))
  }
  return (
    <>
      <InfoBox message={message} />
      <article className="selection-bookingseats-main">
        <section className="selection-bookingseats-left">
          <div className="selection-bookingseats-instructions">Select seats for Manila to Iloilo - just tap on a passenger below</div>
          <div className="selection-bookingseats-list-header">List of travellers</div>
          <div>
            {customers.map((x, i) => (
              <div className="selection-bookingseats-list-item" key={x.firstName + x.lastName + x.birthday}>
                <label htmlFor={x.firstName + x.lastName + x.birthday} className="selection-bookingseats-list-label">
                  <input className="selection-bookingseats-list-radio" type="radio" id={x.firstName + x.lastName + x.birthday} onChange={() => selectPassenger(x, i)} checked={currPassenger.index === i} />
                  <div className="selection-bookingseats-list-item-name">
                    {x.title}
                    {' '}
                    {x.firstName}
                    {' '}
                    {x.lastName}
                  </div>
                  {x.seatId && <div className="selection-bookingseats-list-item-seat" style={currPassenger.index === i ? { backgroundColor: 'blue' } : { backgroundColor: 'black' }}>{i + 1}</div>}
                  <div>
                    {x.seat || 'No seat selected'}
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="selection-bookingseats-list-options">
            <button className="selection-bookingseats-list-clearbtn" type="button" onClick={clearSeats}>Clear all seats</button>
          </div>
          <div className="selection-bookingseats-legend-header">Legend</div>
          <div className="selection-bookingseats-legend-container">
            <div className="selection-bookingseats-legend">
              <CheckBoxIcon className="selection-bookingseats-icon" />
              Selected Seat
            </div>
            <div className="selection-bookingseats-legend">
              <EventSeatIcon className="selection-bookingseats-icon" />
              Available (Not Chargeable)
            </div>
            <div className="selection-bookingseats-legend">
              <StarIcon className="selection-bookingseats-icon" />
              Available (Chargeable)
            </div>
            <div className="selection-bookingseats-legend">
              <CloseIcon className="selection-bookingseats-icon" />
              Not Available
            </div>
            <div className="selection-bookingseats-legend">
              <LogoutIcon className="selection-bookingseats-icon" />
              Exit Row
            </div>
          </div>
        </section>
        <section className="selection-bookingseats-right">
          <div className="selection-bookingseats-planename">
            {formData?.flight?.plane?.name}
            {' '}
            {formData?.flight?.plane?.model?.name}
          </div>
          <form className="selection-bookingseats-seatpicker">
            <SeatPicker
              planeLayout={layout.map((floor) => floor.map((box) => (occupied.includes(box.id) ? { ...box, type: 'occupied' } : box)))}
              setCustomers={setCustomers}
              customerIndex={currPassenger.index}
              cabinClass={formData.cabinClass}
              customers={customers}
            />
          </form>
        </section>
      </article>
      <div className="selection-page-continue-container">
        <button type="button" className="selection-page-continue-btn" onClick={nextPage}>
          CONTINUE
          <ArrowRightIcon />
        </button>
      </div>
    </>
  )
}

export default BookingSeatsView
