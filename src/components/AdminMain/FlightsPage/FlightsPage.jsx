import React, { useState } from 'react'
import {
  TextField, Button, TableContainer, Paper, TableRow, TableCell, Table, TableBody, TableHead,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import FlightsForm from './FlightsForm'
import './FlightsPage.css'

const FlightsPage = React.memo(({ flights, routes, planes }) => {
  const [hidden, setHidden] = useState(true)
  const [search, setSearch] = useState('')

  const btntxt = hidden ? 'Make a new flights' : 'cancel'
  const btnstyle = hidden || { color: 'error' }

  return (
    <article className="adminFlightsPage">
      <header className="admin-flights-header">Flights</header>
      <div className="admin-flights-form-container">
        <div hidden={hidden}>
          <FlightsForm routes={routes} planes={planes} />
        </div>
      </div>
      <div className="admin-flights-buttons">
        <Button variant="contained" {...btnstyle} onClick={() => setHidden(!hidden)}>{btntxt}</Button>
      </div>
      <div className="admin-flights-table">
        <TextField className="flights-searchbar" label="Search" variant="filled" value={search} onChange={(event) => setSearch(event.target.value)} />
        <TableContainer component={Paper} style={{ maxHeight: 335 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Route</TableCell>
                <TableCell align="center">Plane</TableCell>
                <TableCell align="center">Departure Date</TableCell>
                <TableCell align="center">Arrival Date</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights
                .map((flight) => (
                  <TableRow
                    key={flight.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{flight.id}</TableCell>
                    <TableCell align="center">{`${flight.route.origin.name.split('-')[0]} -  ${flight.route.destination.name.split('-')[0]}`}</TableCell>
                    <TableCell align="center">{flight.plane.name}</TableCell>
                    <TableCell align="center">{format(parseISO(flight.departureDate), 'MMM dd, yyyy - HH:mm')}</TableCell>
                    <TableCell align="center">{format(parseISO(flight.arrivalDate), 'MMM dd, yyyy - HH:mm')}</TableCell>
                    <TableCell align="center">
                      <Button>
                        <Link style={{ textDecoration: 'none' }} to={`/admin/flights/${flight.id}`}>Look Up Flights</Link>
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
})

export default FlightsPage
