import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import bookingsService from '../../../services/bookingsService'
import Summary from './Summary'
import Header from './Header'
import Status from './Status'
import Warnings from './Warnings'
import CalendarView from './CalendarView'
import Footer from './Footer'
import TimeTableView from './TimeTableView'
import BookingView from './BookingView'
import BookingSeatsView from './BookingSeatsView'
import PaymentPage from './PaymentPage'
import './SelectionPage.css'
import { useFormData, useFormDataUpdate } from '../../../contexts/FormDataContext'
import { changeNotification } from '../../../reducers/notificationReducer'

const SelectionPage = ({ flights, setFlights }) => {
  const formData = useFormData()
  const setFormData = useFormDataUpdate()
  const dispatch = useDispatch()

  const [customers, setCustomers] = useState(
    Array(formData.adult)
      .fill()
      .map(() => ({
        firstName: '', lastName: '', title: '', birthday: new Date().getDate(), type: 'Adult',
      }))
      .concat(
        Array(formData.child)
          .fill()
          .map(() => ({
            firstName: '', lastName: '', title: '', birthday: new Date().getDate(), type: 'Child',
          })),
      )
      .flat(),
  )
  const [booking, setBooking] = useState({
    email: '', reemail: '', phoneNumber: '', emergencyPhone: '', emergencyName: '',
  })
  const [layout, setLayout] = useState([])
  useEffect(() => {
    if (window.localStorage.getItem('formData')) {
      setFormData(JSON.parse(window.localStorage.getItem('formData')))
    }
    if (window.localStorage.getItem('flights')) {
      setFlights(JSON.parse(window.localStorage.getItem('flights')))
    }
  }, [])

  const submitBooking = async () => {
    try {
      await bookingsService.create({
        customers: customers.map((x) => ({ ...x, seatId: x.seatId.id })),
        booking: { ...booking, flightId: formData.flight.id },
      })
      dispatch(changeNotification('Success: You have succesfully booked a flight', 5))
    } catch (e) {
      dispatch(changeNotification('Error: Flight booking failed. Please try again', 5))
    }
  }
  const bookingViewRef = useRef()
  return (
    <div className="selection-page">
      <Header />
      <Status />
      <div className="selection-main">
        <div className="selection-main-inner">
          {!flights[0]
            ? <Warnings />
            : (
              <Routes>
                <Route path="/select/calendar" element={<CalendarView flights={flights} />} />
                <Route path="/select/times" element={<TimeTableView flights={flights} />} />
                <Route path="/book/passengers" element={<BookingView ref={bookingViewRef} customers={customers} setCustomers={setCustomers} booking={booking} setBooking={setBooking} setLayout={setLayout} />} />
                <Route path="/book/seats" element={<BookingSeatsView customers={customers} setCustomers={setCustomers} layout={layout} />} />
                <Route path="/pay" element={<PaymentPage submitBooking={submitBooking} />} />
                <Route path="/*" element={<div>Not Founds</div>} />
              </Routes>
            )}
        </div>
        <Summary
          bookingViewRef={bookingViewRef}
        />
      </div>
      <Footer />
    </div>
  )
}
export default SelectionPage
