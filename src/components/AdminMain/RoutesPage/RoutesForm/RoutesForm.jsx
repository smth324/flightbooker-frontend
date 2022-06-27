import React, { useState } from 'react'
import { TextField, Button, Autocomplete } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createRoute } from '../../../../reducers/routesReducer'
import './RoutesForm.css'

const RoutesForm = ({ places }) => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createRoute({ originId: origin.id, destinationId: destination.id }))
    setOrigin('')
    setDestination('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-routes-form">
        <Autocomplete
          autoHighlight
          autoComplete
          autoSelect={false}
          options={places.filter((x) => x.active).filter((x) => x.name !== destination?.name)}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Origin" />}
          onChange={(event, value) => setOrigin(value)}
        />
        <div style={{ width: 30 }} />
        <Autocomplete
          autoHighlight
          autoComplete
          options={places.filter((x) => x.active).filter((x) => x.name !== origin?.name)}
          autoSelect={false}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Destination" />}
          onChange={(event, value) => setDestination(value)}
        />
      </div>
      <Button variant="contained" color="success" type="submit">Create a new route</Button>
    </form>
  )
}

export default RoutesForm
