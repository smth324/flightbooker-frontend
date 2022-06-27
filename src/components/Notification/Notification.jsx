import React from 'react'
import { Alert } from '@mui/material'
import './Notification.css'
import { useDispatch } from 'react-redux'
import { changeNotification } from '../../reducers/notificationReducer'

const Notification = ({ msg }) => {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(changeNotification('', 1))
  }
  if (msg === '') {
    return null
  }
  if (msg.match('Error')) {
    return (
      <Alert onClose={handleClose} severity="error" className="notification" variant="filled">{msg}</Alert>
    )
  }
  if (msg.match('Info')) {
    return <Alert onClose={handleClose} severity="info" className="notification" variant="filled">{msg}</Alert>
  }
  return (
    <Alert onClose={handleClose} severity="success" className="notification" variant="filled">{msg}</Alert>
  )
}

export default Notification
