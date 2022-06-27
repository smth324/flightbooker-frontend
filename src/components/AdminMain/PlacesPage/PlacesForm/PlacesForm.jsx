import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createPlace } from '../../../../reducers/placesReducer'
import './PlacesForm.css'
import { changeNotification } from '../../../../reducers/notificationReducer'

const PlacesForm = () => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (name.match('[a-zA-Z]+ \\([A-Z]{3}\\)\\s-\\s[a-zA-Z]+')) {
      dispatch(createPlace({ name }))
      setName('')
    } else {
      dispatch(changeNotification('Error: invalid place format. (City (CTY) - Country)', 5))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-places-form">
        <div>
          <TextField sx={{ width: 300 }} label="City (CTY) - Country" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
      </div>
      <Button variant="contained" color="success" type="submit">Create a new place</Button>
    </form>
  )
}

export default PlacesForm
