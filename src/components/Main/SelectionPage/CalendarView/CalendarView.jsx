import React from 'react'
import FlightIcon from '@mui/icons-material/Flight'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { parseISO, format, isSameDay } from 'date-fns'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { useNavigate } from 'react-router-dom'
import InfoBox from '../InfoBox'
import './CalendarView.css'
import { useFormData, useFormDataUpdate } from '../../../../contexts/FormDataContext'

const message = (
  <div>
    Fares shown in the calendar are the lowest price for each dates for your flights.
    Price is for one traveler and includes taxes. *ENJOY UNLIMITED FREE REBOOKING until further
    notice, when you make changes to your international and domestic booking at least 24 hours
    before the flight.
    For more details, please see purchase conditions at the summary page. Other conditions apply.
    NOTE: Flights to/from Tel Aviv, Israel are subject to airport and government approvals.
    <br />
    <br />
    You will select your flights at the next step
  </div>
)

const selectedStyle = {
  backgroundColor: '#005eb8',
  border: '4px solid #dfdfdf',
  color: 'white',
}

const CalendarView = ({ flights }) => {
  const formData = useFormData()
  const setFormData = useFormDataUpdate()
  const navigate = useNavigate()

  const empty = []
  // determines the number of empty spaces needed to correct the placements of the date boxes
  // to align with the days of the week
  const emptyGuide = [4, 5, 6, 0, 1, 2, 3]
  for (let i = 0; i < emptyGuide[new Date(formData.departureDate).getDay()]; i += 1) {
    empty.push(<div key={i} />)
  }

  const changeSelectedDate = (date) => {
    if (window.localStorage.getItem('formData')) {
      const storedFormData = JSON.parse(window.localStorage.getItem('formData'))
      window.localStorage.setItem('formData', JSON.stringify({ ...storedFormData, newDepartureDate: date.toISOString() }))
    }
    setFormData((value) => ({ ...value, newDepartureDate: date.toISOString() }))
  }

  const nextPage = () => {
    navigate('/selection/select/times')
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
        <div className="selection-date-grid-box-empty" key={date.toISOString()}>
          <div>
            <div>{format(parseISO(date.toISOString()), 'dd')}</div>
            <div>{format(parseISO(date.toISOString()), 'MMM').toUpperCase()}</div>
          </div>
          <div className="selection-date-grid-box-empty-text">NOT AVAILABLE</div>
        </div>,
      )
    } else {
      dates.push(
        <div
          key={date.toISOString()}
          className="selection-date-grid-box"
          onClick={() => changeSelectedDate(date)}
          role="button"
          onKeyDown={() => changeSelectedDate(date)}
          tabIndex={0}
          id={new Date(formData.newDepartureDate).toDateString()
            === date.toDateString() ? 'selected-box' : null}
          style={new Date(formData.newDepartureDate).toDateString()
             === date.toDateString() ? selectedStyle : {}}
        >
          <div className="selection-date-grid-box-header">
            <div>
              <div>{format(parseISO(date.toISOString()), 'dd')}</div>
              <div>{format(parseISO(date.toISOString()), 'MMM').toUpperCase()}</div>
            </div>
            {new Date(formData.newDepartureDate).toDateString()
            === date.toDateString() ? <CheckCircleIcon id="check-circle" /> : null}
          </div>
          <div className="selection-date-grid-box-inner">
            <div>From</div>
            <div>PHP</div>
            <div>
              {Math.min(...flights
                .filter((x) => isSameDay(new Date(x.departureDate), new Date(date)))
                .map((x) => x.price))}
            </div>
          </div>
        </div>,
      )
    }
  }
  return (
    <div id="calendar-view">
      <InfoBox message={message} />
      <div className="selection-route-container">
        <FlightIcon />
        <div className="selection-route-origin">{formData.origin}</div>
        <div className="selection-route-to">TO</div>
        <div>{formData.destination}</div>
      </div>
      <div className="selection-date-header">
        <CalendarMonthIcon className="selection-date-icon" />
        {format(parseISO(formData.newDepartureDate || formData.departureDate), 'EEEE dd MMM')}
      </div>
      <div className="selection-route-subheader">Please select departure date</div>
      <div className="selection-date-grid">
        <div className="selection-date-grid-header">Sunday</div>
        <div className="selection-date-grid-header">Monday</div>
        <div className="selection-date-grid-header">Tuesday</div>
        <div className="selection-date-grid-header">Wednesday</div>
        <div className="selection-date-grid-header">Thursday</div>
        <div className="selection-date-grid-header">Friday</div>
        <div className="selection-date-grid-header">Saturday</div>
        {empty}
        {dates}
      </div>
      <div className="selection-page-continue-container">
        <button type="button" className="selection-page-continue-btn" id="continue-button" onClick={nextPage}>
          CONTINUE
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  )
}

export default CalendarView
