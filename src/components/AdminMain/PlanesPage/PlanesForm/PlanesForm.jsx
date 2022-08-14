import React, { useState } from 'react'
import { TextField, Button, Autocomplete } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createPlane } from '../../../../reducers/planesReducer'
import { changeNotification } from '../../../../reducers/notificationReducer'
import './PlanesForm.css'

const PlanesForm = ({ planeModels }) => {
  const [name, setName] = useState('')
  const [model, setModel] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (name === '' || model === '') {
      dispatch(changeNotification('Error: Must provide name and model.', 5))
      return
    }
    dispatch(createPlane({ name, modelId: model.id }))
    setName('')
    setModel('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-planes-form">
        <div>
          <TextField sx={{ width: 300 }} label="Name (PR 123)" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="admin-planes-form-dest">
          <Autocomplete
            autoHighlight
            autoComplete
            options={planeModels.filter((x) => x.active)}
            autoSelect={false}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Model Name" />}
            onChange={(event, value) => setModel(value)}
          />
        </div>
      </div>
      <Button variant="contained" color="success" type="submit">Create a new plane</Button>
    </form>
  )
}

export default PlanesForm
