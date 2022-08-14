import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import PersonIcon from '@mui/icons-material/Person'
import PlaceIcon from '@mui/icons-material/Place'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import { Link, useParams } from 'react-router-dom'
import DiscountIcon from '@mui/icons-material/Discount'
import MapIcon from '@mui/icons-material/Map'
import './AdminSidebar.css'

const opened = {
  width: 140,
  minWidth: 140,
}

const AdminSidebar = () => {
  const [open, setOpen] = useState(false)
  const currPage = useParams()['*']
  const selected = open ? {
    backgroundColor: '#383838',
    justifyContent: 'left',
    paddingLeft: 30,
  } : {
    backgroundColor: '#383838',
  }

  // determines style of nav elements
  const notSelected = open
    ? {
      justifyContent: 'left',
      paddingLeft: 20,
      paddingRight: 20,
    }
    : null

  const handleMenu = () => {
    setOpen(!open)
  }

  return (
    <section className="admin-sidebar" style={open ? opened : {}}>
      <button className="admin-sidebar-top admin-sidebar-menu-icon" onClick={handleMenu} type="button" tabIndex={0}>
        <MenuIcon className="admin-sidebar-icon" />
        {open
          ? (
            <div className="admin-sidebar-text">
              DashBoard
            </div>
          ) : null }
      </button>
      <nav className="admin-sidebar-middle">
        <Link className="admin-sidebar-icon-container" to="/admin/planeModels" style={currPage === 'planeModels' ? selected : notSelected}>
          <EventSeatIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Models
              </div>
            ) : null }
        </Link>
        <Link className="admin-sidebar-icon-container" to="/admin/planes" style={currPage === 'planes' ? selected : notSelected}>
          <AirplanemodeActiveIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Planes
              </div>
            ) : null }
        </Link>
        <Link className="admin-sidebar-icon-container" to="/admin/flights" style={currPage === 'flights' ? selected : notSelected}>
          <FlightTakeoffIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Flights
              </div>
            ) : null }
        </Link>
        <Link className="admin-sidebar-icon-container" to="/admin/customers" style={currPage === 'customers' ? selected : notSelected}>
          <PersonIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Customers
              </div>
            ) : null }
        </Link>
        <Link className="admin-sidebar-icon-container" to="/admin/bookings" style={currPage === 'bookings' ? selected : notSelected}>
          <BookmarkIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Bookings
              </div>
            ) : null }
        </Link>
        <Link className="admin-sidebar-icon-container" to="/admin/routes" style={currPage === 'routes' ? selected : notSelected}>
          <ConnectingAirportsIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Routes
              </div>
            ) : null }
        </Link>
        <Link className="admin-sidebar-icon-container" to="/admin/places" style={currPage === 'places' ? selected : notSelected}>
          <PlaceIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Places
              </div>
            ) : null }
        </Link>
        <Link className="admin-sidebar-icon-container" to="/admin/promotions" style={currPage === 'promotions' ? selected : notSelected}>
          <DiscountIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Promotions
              </div>
            ) : null }
        </Link>
        <Link className="admin-sidebar-icon-container" to="/admin/flightmap" style={currPage === 'flightmap' ? selected : notSelected}>
          <MapIcon className="admin-sidebar-icon" />
          {open
            ? (
              <div className="admin-sidebar-text">
                Flight Map
              </div>
            ) : null }
        </Link>
      </nav>
    </section>
  )
}

export default AdminSidebar
