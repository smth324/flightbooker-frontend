import React from 'react'
import {
  format, parseISO, differenceInMinutes, differenceInCalendarDays,
} from 'date-fns'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import './Summary.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeNotification } from '../../../../reducers/notificationReducer'
import { useFormData } from '../../../../contexts/FormDataContext'

const Summary = ({ bookingViewRef }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const formData = useFormData()

  const nextPage = () => {
    switch (location.pathname) {
    case '/selection/select/calendar':
      return navigate('/selection/select/times')
    case '/selection/select/times':
      if (formData.flight) {
        return navigate('/selection/book/passengers')
      }
      return dispatch(changeNotification('Error: You must pick a flight', 5))
    case '/selection/book/passengers':
      bookingViewRef.current.nextPage()
      return null
    default:
      return null
    }
  }

  return (
    <div className="selection-summary-container">
      <div className="selection-summary">
        <div className="selection-summary-part">
          YOUR BOOKING
        </div>
        <div className="selection-summary-part">
          {`${formData.child + formData.adult} `}
          Traveller
          {formData.adult + formData.child > 1 && 's'}
          <br />
          {`${formData.adult} `}
          Adult
          {formData.adult > 1 && 's'}
          <br />
          {formData.child ? `${formData.child} Child` : null}
          {formData.child > 1 && 'ren'}
        </div>
        <div className="selection-summary-part">
          {formData.departureDate && format(parseISO(formData.newDepartureDate || formData.departureDate), 'eee dd MMM yyyy')}
          {formData.flight
            ? (
              <div>
                <div>
                  <h3 className="selection-summary-times">{format(parseISO(formData.flight.departureDate), 'HH:mm ')}</h3>
                  {formData.flight.route.origin.name}
                </div>
                <div>
                  <h3 className="selection-summary-times">{format(parseISO(formData.flight.arrivalDate), 'HH:mm')}</h3>
                  {Math.abs(differenceInCalendarDays(
                    new Date(formData.flight.departureDate),
                    new Date(formData.flight.arrivalDate),
                  )) > 0
                    ? (
                      <sup>
                        +
                        {Math.abs(differenceInCalendarDays(
                          new Date(formData.flight.departureDate),
                          new Date(formData.flight.arrivalDate),
                        ))}
                        {' '}
                        {Math.abs(differenceInCalendarDays(
                          new Date(formData.flight.departureDate),
                          new Date(formData.flight.arrivalDate),
                        )) > 1 ? 'days ' : 'day '}
                      </sup>
                    )
                    : null}
                  {formData.flight.route.destination.name}
                </div>
                <div>
                  Total duration
                  {` ${Math.floor(
                    Math.abs(differenceInMinutes(
                      new Date(formData.flight.departureDate),
                      new Date(formData.flight.arrivalDate),
                    ) / 60),
                  )}h${Math.abs(differenceInMinutes(new Date(formData.flight.departureDate), new Date(formData.flight.arrivalDate)) % 60)}m`}
                </div>
                <div>
                  Fare Type
                  {' '}
                  {formData.cabinClass}
                </div>
              </div>
            )
            : null}
        </div>
        {formData.price ? <div className="selection-summary-part">{`PHP ${formData.price}`}</div> : null}
        <div className="selection-summary-continue" onClick={nextPage} onKeyDown={nextPage} role="button" tabIndex={0}>
          CONTINUE
          <ArrowRightIcon />
        </div>
        <div className="selection-summary-part">Booking Details</div>
      </div>
    </div>
  )
}
export default Summary
