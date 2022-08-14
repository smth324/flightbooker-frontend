import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Button, Paper, TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { getCompleteBooking } from '../../../reducers/bookingsReducer'
import './SingleBookingPage.css'

const SingleBookingPage = ({ booking }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getCompleteBooking(booking))
  }, [])

  if (!booking.flight) {
    return <div>Loading...</div>
  }

  return (
    <div className="admin-customers-single-page">
      <Button variant="outlined"><Link style={{ textDecoration: 'none' }} to="/admin/bookings">Back</Link></Button>
      <div style={{ padding: 10 }}>
        <div>
          Booking ID:
          {booking.id}
        </div>
        <div>
          Promotion Code:
          {booking.promotionCode}
        </div>
        <div>
          Price:
          {booking.price}
        </div>
        <header className="admin-customers-header">Flight</header>
        <div className="admin-customers-single-flightcontainer">
          <div>
            Route:
            {` ${booking.flight.route.origin.name} ----- ${booking.flight.route.destination.name}`}
          </div>
          <div>
            Plane:
            {booking.flight.plane.name}
          </div>
          <div>
            Departure Date:
            {format(parseISO(booking.flight.arrivalDate), 'MMM dd, yyyy - HH:mm')}
          </div>
          <div>
            Arrival Date:
            {format(parseISO(booking.flight.arrivalDate), 'MMM dd, yyyy - HH:mm')}
          </div>
        </div>
        <header className="admin-customers-header">Customers</header>
        <div className="admin-customers-single-table">
          <TextField className="admin-customers-searchBar" label="Search" variant="filled" value={search} onChange={(event) => setSearch(event.target.value)} />
          <TableContainer component={Paper} style={{ maxHeight: 335 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="center">Birthday</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Booking ID</TableCell>
                  <TableCell align="center">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booking.customers
                  .map((customer) => (
                    <TableRow
                      key={customer.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{customer.id}</TableCell>
                      <TableCell align="right">{customer.title}</TableCell>
                      <TableCell align="right">{customer.firstName}</TableCell>
                      <TableCell align="right">{customer.lastName}</TableCell>
                      <TableCell align="center">{customer.birthday}</TableCell>
                      <TableCell align="center">{customer.type}</TableCell>
                      <TableCell align="center">{customer.bookingId}</TableCell>
                      <TableCell align="center">
                        <Button>
                          <Link style={{ textDecoration: 'none' }} to={`/admin/customers/${customer.id}`}>Look Up Customer</Link>
                        </Button>
                        <Button color="error">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default SingleBookingPage
