import React, { useState } from 'react'
import {
  TextField, Button, Autocomplete, InputAdornment,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { createRoute } from '../../../../reducers/routesReducer'
import { changeNotification } from '../../../../reducers/notificationReducer'
import './RoutesForm.css'

const RoutesForm = ({ places }) => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [price, setPrice] = useState(0)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (origin === '' || destination === '' || price === 0) {
      dispatch(changeNotification('Error: Please fill up all the blanks', 5))
      return
    }
    dispatch(createRoute({ originId: origin.id, destinationId: destination.id, price }))
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
        <div style={{ width: 30 }} />
        <TextField
          sx={{ width: 300 }}
          label="Price"
          variant="outlined"
          InputProps={{ startAdornment: <InputAdornment position="start">PHP</InputAdornment> }}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <Button variant="contained" color="success" type="submit">Create a new route</Button>
    </form>
  )
}

export default RoutesForm
