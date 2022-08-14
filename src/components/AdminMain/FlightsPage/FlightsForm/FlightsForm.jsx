import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, Autocomplete } from '@mui/material'
import { DateTimePicker } from '@mui/lab'
import { createFlight } from '../../../../reducers/flightReducer'
import { changeNotification } from '../../../../reducers/notificationReducer'
import './FlightsForm.css'

const FlightsForm = ({ routes, planes }) => {
  const [arrivalDate, setArrivalDate] = useState(new Date().toISOString())
  const [departureDate, setDepartureDate] = useState(new Date().toISOString())
  const [plane, setPlane] = useState()
  const [route, setRoute] = useState()

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!plane || !route) {
      dispatch(changeNotification('Error: Please fill out all the forms', 5))
      return
    }
    dispatch(createFlight({
      departureDate, arrivalDate, planeId: plane.id, routeId: route.id,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-flights-form">
        <div>
          <Autocomplete
            autoHighlight
            autoComplete
            autoSelect={false}
            options={routes.filter((x) => x.active)}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => {
              const origin = option.origin.name.split('-')[0]
              const destination = option.destination.name.split('-')[0]
              return `${origin}- ${destination} ${option.price}`
            }}
            sx={{ width: 300, paddingRight: 3 }}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Routes" />}
            onChange={(event, value) => setRoute(value)}
          />
        </div>
        <div>
          <Autocomplete
            autoHighlight
            autoComplete
            autoSelect={false}
            options={planes.filter((x) => x.active)}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => `${option.name} - ${option.model.name}`}
            sx={{ width: 300, paddingRight: 3 }}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Planes" />}
            onChange={(event, value) => setPlane(value)}
          />
        </div>
        <div>
          <DateTimePicker
            ampm={false}
            label="Departure Date"
            value={departureDate}
            disablePast
            disableMaskedInput
            inputFormat="MMM dd, yyyy - HH:mm"
            onChange={(newValue) => setDepartureDate(newValue)}
            renderInput={(params) => (<TextField className="book-form-input" {...params} />)}

          />
        </div>
        <div style={{ paddingRight: 20 }} />
        <div>
          <DateTimePicker
            ampm={false}
            label="Arrival Date"
            disablePast
            inputFormat="MMM dd, yyyy - HH:mm"
            disableMaskedInput
            value={arrivalDate}
            onChange={(newValue) => setArrivalDate(newValue)}
            renderInput={(params) => (<TextField className="book-form-input" {...params} />)}
          />
        </div>
      </div>
      <Button variant="contained" color="success" type="submit">Create a new flight</Button>
    </form>
  )
}

export default FlightsForm
