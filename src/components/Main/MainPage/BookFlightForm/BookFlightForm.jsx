import React, { useState, useLayoutEffect } from 'react'
import { TextField, Autocomplete } from '@mui/material'
import { DatePicker } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import flightsService from '../../../../services/flightsService'
import PassengerButton from './PassengerButton'
import { classes } from '../../../../helpers/formData'
import routesService from '../../../../services/routesService'
import { useFormData, useFormDataUpdate } from '../../../../contexts/FormDataContext'
import './BookFlightForm.css'

// sets defualt availabale values for flight dates
const today = new Date()
const max = new Date(new Date().setDate(today.getDate() + 45))

const available = {
  backgroundColor: 'red',
  border: '1px solid red',
  cursor: 'pointer',
}

const notAvailable = {
  backgroundColor: 'pink',
  border: '1px solid pink',
  cursor: 'not-allowed',
}

const BookFlightForm = ({ setFlights }) => {
  const [routes, setRoutes] = useState([])

  const formData = useFormData()
  const setFormData = useFormDataUpdate()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    window.localStorage.removeItem('formData')
    window.localStorage.removeItem('flights')
    const getRoutes = async () => {
      const returnedRoutes = await routesService.getAll()
      setRoutes(returnedRoutes)
    }
    getRoutes()
  }, [])

  // checks whether the forms are empty or not
  const canSubmit = () => !(
    !formData.origin
    || !formData.destination
    || !formData.departureDate
    || !formData.returnDate
    || !formData.cabinClass
  )

  // sends request to server with flight info
  const handleSubmit = async (event) => {
    event.preventDefault()
    const flights = await flightsService.search({
      origin: formData.origin,
      destination: formData.destination,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      cabinClass: formData.cabinClass,
      child: formData.child,
      adult: formData.adult,
    })
    window.localStorage.removeItem('formData')
    window.localStorage.setItem('formData', JSON.stringify({
      origin: formData.origin,
      destination: formData.destination,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      cabinClass: formData.cabinClass,
      child: formData.child,
      adult: formData.adult,
      promoPercent: formData.promoPercent,
      price: formData.price,
    }))
    window.localStorage.removeItem('flights')
    window.localStorage.setItem('flights', JSON.stringify(flights))
    setFlights(flights)
    navigate('/selection/select/calendar')
  }
  return (
    <form className="book-form-bg">
      <div className="book-form-header">Book Flight</div>
      <div className="book-form-input-row">
        <Autocomplete
          autoHighlight
          id="origin"
          autoComplete
          autoSelect
          options={(formData.origin === null && formData.destination === null) || (formData.origin === '' && formData.destination === null)
            ? [...new Set(routes.map((x) => x.origin.name))]
            : [...new Set(routes.map((x) => x.origin.name))]
              .filter((x) => x !== formData.destination)
              .filter((x) => {
                if (formData.destination === null || formData.destination === '') {
                  return true
                }
                return routes
                  .filter((route) => formData.destination === route.destination.name)
                  .map((route) => route.origin.name)
                  .includes(x)
              })}
          className="main-book-form-input"
          renderInput={(params) => <TextField {...params} variant="filled" label="Origin" />}
          onInputChange={(event, value) => setFormData((prev) => ({ ...prev, origin: value }))}
        />
        <Autocomplete
          id="destination"
          autoHighlight
          autoSelect
          options={(formData.destination === null && formData.origin === null) || (formData.destination === '' && formData.origin === null)
            ? [...new Set(routes.map((x) => x.destination.name))]
            : [...new Set(routes.map((x) => x.destination.name))]
              .filter((x) => x !== formData.origin)
              .filter((x) => {
                if (formData.origin === null || formData.origin === '') {
                  return true
                }
                console.log(x)
                return routes
                  .filter((route) => formData.origin === route.origin.name)
                  .map((route) => route.destination.name)
                  .includes(x)
              })}
          className="main-book-form-input"
          renderInput={(params) => <TextField {...params} variant="filled" id="destination" label="Destination" />}
          onInputChange={(event, value) => setFormData((prev) => ({ ...prev, destination: value }))}
        />
      </div>
      <div className="book-form-input-row">
        <DatePicker
          label="Departure date"
          value={formData.departureDate}
          disablePast
          maxDate={max}
          onChange={(newValue) => {
            setFormData((prev) => ({ ...prev, departureDate: new Date(newValue).toISOString() }))
          }}
          renderInput={(params) => <TextField variant="filled" id="departureDate" className="main-book-form-input" {...params} />}
        />
        <DatePicker
          label="Return date"
          value={formData.returnDate}
          disablePast
          maxDate={max}
          onChange={(newValue) => {
            setFormData((prev) => ({ ...prev, returnDate: new Date(newValue).toISOString() }))
          }}
          renderInput={(params) => <TextField variant="filled" id="returnDate" className="main-book-form-input" {...params} />}
        />
      </div>
      <div className="book-form-input-row">
        <PassengerButton
          passenger={{
            child: formData.child,
            adult: formData.adult,
          }}
          setPassengers={(value) => setFormData((prev) => ({ ...prev, ...value }))}
        />
        <Autocomplete
          autoHighlight
          id="cabinClass"
          options={classes}
          value={formData.cabinClass}
          className="main-book-form-input"
          renderInput={(params) => <TextField {...params} variant="filled" label="Cabin Class" />}
          onChange={(event, value) => setFormData((prev) => ({ ...prev, cabinClass: value }))}
        />
      </div>
      <div className="book-form-submit-container">
        <button type="submit" disabled={!canSubmit()} onClick={handleSubmit} className="book-form-submit" style={canSubmit() ? available : notAvailable}>Search Flight</button>
      </div>
    </form>
  )
}

export default BookFlightForm
