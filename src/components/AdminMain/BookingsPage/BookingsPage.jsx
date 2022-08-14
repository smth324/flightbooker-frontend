import React, { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import BookingsForm from './BookingsForm'
import './BookingsPage.css'

const BookingsPage = ({ bookings, flights }) => {
  const [search, setSearch] = useState('')

  return (
    <article className="admin-bookings-page">
      <header className="admin-bookings-header">Bookings</header>
      <div className="admin-bookings-form-container" />
      <div className="admin-bookings-buttons">
        <BookingsForm flights={flights} />
      </div>
      <div className="admin-bookings-table">
        <TextField className="admin-bookings-searchBar" label="Search" variant="filled" value={search} onChange={(event) => setSearch(event.target.value)} />
        <TableContainer component={Paper} style={{ maxHeight: 335 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Promotion Code</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Emergency Name</TableCell>
                <TableCell align="center">Emergency Phone</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Flight</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings
                .map((booking) => (
                  <TableRow
                    key={booking.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{booking.id}</TableCell>
                    <TableCell>{booking.promotionCode}</TableCell>
                    <TableCell align="center">{booking.phoneNumber}</TableCell>
                    <TableCell align="center">{booking.emergencyName}</TableCell>
                    <TableCell align="center">{booking.emergencyPhone}</TableCell>
                    <TableCell align="center">{booking.email}</TableCell>
                    <TableCell align="center">{booking.flight?.id || booking.flightId}</TableCell>
                    <TableCell align="center">{booking.price}</TableCell>
                    <TableCell align="center">
                      <Button>
                        <Link style={{ textDecoration: 'none' }} to={`/admin/bookings/${booking.id}`}>Look Up Booking</Link>
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
    </article>
  )
}

export default BookingsPage
