import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, InputAdornment } from '@mui/material'
import { DatePicker } from '@mui/lab'
import { changeNotification } from '../../../../reducers/notificationReducer'
import { createPromotion } from '../../../../reducers/promotionsReducer'
import './PromotionsForm.css'

const PromotionsForm = () => {
  const [code, setCode] = useState('')
  const [promotionPercent, setPromotionPercent] = useState(0)
  const [expiryDate, setExpiryDate] = useState(new Date().toISOString())
  const [numberOfRedemptions, setNumberOfRedemptions] = useState(0)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!code || !promotionPercent || !numberOfRedemptions) {
      dispatch(changeNotification('Error: Please fill out all the forms', 5))
      return
    }
    dispatch(createPromotion({
      code, promotionPercent, expiryDate, numberOfRedemptions,
    }))
    setCode('')
    setPromotionPercent(0)
    setNumberOfRedemptions(0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-flights-form">
        <TextField sx={{ width: 300 }} label="Code" variant="outlined" value={code} onChange={(event) => setCode(event.target.value)} />
        <div style={{ width: 30 }} />
        <TextField sx={{ width: 300 }} label="Promotion Percent" variant="outlined" InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} value={promotionPercent} onChange={(event) => setPromotionPercent(event.target.value)} />
        <div style={{ width: 30 }} />
        <DatePicker
          label="Expiry Date"
          value={expiryDate}
          disablePast
          onChange={(newValue) => {
            setExpiryDate(new Date(newValue).toISOString())
          }}
          renderInput={(params) => <TextField className="book-form-input" {...params} />}
        />
        <div style={{ width: 30 }} />
        <TextField sx={{ width: 300 }} label="Number Of Redemptions" variant="outlined" value={numberOfRedemptions} onChange={(event) => setNumberOfRedemptions(event.target.value)} />
      </div>
      <Button variant="contained" color="success" type="submit">Create a promotion</Button>
    </form>
  )
}

export default PromotionsForm
