import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAdmin } from '../../../reducers/adminReducer'
import './AdminHeader.css'

const AdminHeader = () => {
  const admin = useSelector((state) => state.admin)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutAdmin())
  }

  return (
    <header className="admin-header">
      <div className="admin-header-backbtn">
        <Button variant="text"><Link to="/" style={{ textDecoration: 'none' }}>Back To Main</Link></Button>
      </div>
      <div className="admin-header-admin">
        {`Logged in as ${admin.username}`}
        <Button onClick={handleLogout} variant="text">Log Out</Button>
      </div>
    </header>
  )
}
export default AdminHeader
