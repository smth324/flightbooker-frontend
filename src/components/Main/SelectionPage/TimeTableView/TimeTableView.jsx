import React from 'react'
import FlightIcon from '@mui/icons-material/Flight'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import SellIcon from '@mui/icons-material/Sell'
import { Link, useNavigate } from 'react-router-dom'
import {
  differenceInMinutes, format, parseISO, isSameDay,
} from 'date-fns'
import { useDispatch } from 'react-redux'
import { changeNotification } from '../../../../reducers/notificationReducer'

import InfoBox from '../InfoBox'
import './TimeTableView.css'
import { useFormData, useFormDataUpdate } from '../../../../contexts/FormDataContext'

const message = (
  <div>
    Fares are ALL-IN and not guaranteed until final purchase.
    Prices INCLUDE government taxes and surcharges EXCEPT Philippine Travel Tax,
    other charges and fees that are collected at the airport.
    Taxes and fees are approximate (exact amount will be displayed in the next page.)
    There may be
    {' '}
    <a href="https://www.philippineairlines.com/en/TravelInformation/BeforeYouFly/BaggageInformation/BaggageAllowance/BaggageAllowanceandFees" target="_blank" rel="noreferrer">additional fees</a>
    {' '}
    for your checked baggage in excess of your free baggage allowance.
    <br />
    <br />
    Price is for one traveler and includes taxes. *ENJOY UNLIMITED FREE REBOOKING until further
    notice, when you make changes to your international and domestic
    booking at least 24 hours before the flight.
    For more details, please see purchase conditions at the summary page. Other conditions apply.
    NOTE: Flights to/from Tel Aviv, Israel are subject to airport and government approvals
  </div>
)

const selectedFlightStyle = {
  backgroundColor: '#D0271E',
  border: '5px solid #BA231A',
  color: 'white',
}
const selectedStyle = {
  backgroundColor: '#f8f8f8',
  borderTop: '5px solid #3f3f3f',
  borderLeft: '1px solid #3f3f3f',
  borderRight: '1px solid #3f3f3f',
  borderBottom: '1px solid white',
  zIndex: 2,
}

const TimeTableView = ({ flights }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useFormData()
  const setFormData = useFormDataUpdate()

  const changeSelectedDate = (date) => {
    setFormData((value) => ({ ...value, newDepartureDate: date.toISOString() }))
  }
  const nextPage = () => {
    if (formData.flight) {
      navigate('/selection/book/passengers')
      return
    }
    dispatch(changeNotification('Error: You need to pick a flight first', 5))
  }
  const selectFlight = (flight) => {
    setFormData((value) => ({ ...value, flight, price: flight.price }))
  }

  const dates = []
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(new Date().setDate(new Date(formData.departureDate).getDate() - 3 + i))
    const asd = flights.find((x) => (
      new Date(x.departureDate).toDateString()
      === date.toDateString()
    ))
    if (!asd) {
      dates.push(
        <div className="selection-date-box-empty" key={date.toISOString()}>
          <div className="selection-date-box-header">{format(parseISO(date.toISOString()), 'eee dd').toUpperCase()}</div>
          <div className="selection-date-box-text">
            no fare
            <br />
            available
          </div>
        </div>,
      )
    } else {
      dates.push(
        <div
          key={date.toISOString()}
          className="selection-date-box"
          onClick={() => changeSelectedDate(date)}
          role="button"
          onKeyDown={() => changeSelectedDate(date)}
          tabIndex={0}
          style={new Date(formData.newDepartureDate).toDateString() === date.toDateString()
            ? selectedStyle
            : {}}
        >
          <div className="selection-date-box-header">{format(parseISO(date.toISOString()), 'eee dd').toUpperCase()}</div>
          <div className="selection-date-box-text">
            from PHP
            <br />
            {Math.min(...flights
              .filter((x) => isSameDay(new Date(x.departureDate), new Date(date)))
              .map((x) => x.price))}
          </div>
        </div>,
      )
    }
  }
  return (
    <>
      <InfoBox message={message} />
      <div>
        <div className="selection-timetable-text">Please select departure flight</div>
        <div className="selection-timetable-route-container">
          <div className="selection-timetable-route">
            <FlightIcon className="selection-timetable-flight-icon" />
            <div>{formData.origin}</div>
            <ArrowRightAltIcon className="selection-timetable-arrow-icon" />
            <div>{formData.destination}</div>
          </div>
          <div className="selection-date">
            <CalendarMonthIcon className="selection-date-icon" />
            {format(parseISO(formData.newDepartureDate || formData.departureDate), 'EEEE dd MMM')}
          </div>
        </div>
        <div>
          <Link to="/selection/select/calendar">Go Back to Calendar View</Link>
        </div>
        <div>
          <Link to="/">Go Back to Booking Form</Link>
        </div>
        <div className="selection-timetable-date-header">
          {format(parseISO(formData.departureDate), 'MMMM yyyy').toUpperCase()}
        </div>
        <div className="selection-timetable-dates-container">
          {dates}
          <div className="selection-timetable-dates-container-bottom" />
        </div>
        <div>
          <div className="selection-timetable-header-container">
            <div className="selection-timetable-header">
              <SellIcon className="selection-timetable-header-sell-icon" />
              Lowest Fares
              <CheckCircleIcon className="selection-timetable-header-check-icon" />
              Selected fare
            </div>
            <div className="selection-timetable-header-option">
              {formData.cabinClass}
            </div>
          </div>
          {flights.filter((x) => (
            new Date(x.departureDate).toDateString()
             === new Date(formData.newDepartureDate).toDateString()
          )).map((x) => (
            <div key={x.id} className="selection-timetable-timeoption">
              <div className="selection-timetable-timeoption-main">
                <div>
                  <h2 style={{ display: 'inline' }}>{format(parseISO(x.departureDate), 'HH:mm')}</h2>
                  {`   ${x.route.origin.name}`}
                </div>
                <div className="selection-timetable-timeoption-direction-icon">
                  <ArrowDownwardIcon />
                  Direct
                </div>
                <div>
                  <h2 style={{ display: 'inline' }}>{format(parseISO(x.arrivalDate), 'HH:mm')}</h2>
                  {`   ${x.route.destination.name}`}
                </div>
                <div className="selection-timetable-timeoption-duration-text">
                  Duration
                  <div className="selection-timetable-timeoption-duration">
                    {` ${Math.floor(
                      Math.abs(differenceInMinutes(
                        new Date(x.departureDate),
                        new Date(x.arrivalDate),
                      ) / 60),
                    )}h${Math.abs(differenceInMinutes(new Date(x.departureDate), new Date(x.arrivalDate)) % 60)}m`}
                  </div>
                </div>
                <div>
                  Philippine Airlines
                  {` (${x.plane.name}) `}
                  operated by Pal Express
                </div>
              </div>
              <div className="selection-timetable-timeoption-box-container">
                <button type="button" className="selection-timetable-timeoption-box" style={x.id === formData?.flight?.id ? selectedFlightStyle : null} onClick={() => selectFlight(x)}>
                  {x.id === formData?.flight?.id ? <CheckCircleIcon className="selection-timeoption-header-check-icon" /> : null}
                  <div className="selection-timetable-timeoption-box-content">
                    PHP
                    <br />
                    {x.price}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="selection-page-continue-container">
        <button type="button" className="selection-page-continue-btn" onClick={nextPage}>
          CONTINUE
          <ArrowRightIcon />
        </button>
      </div>
    </>
  )
}
export default TimeTableView
