import React, { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import './CustomersPage.css'

const CustomersPage = ({ customers }) => {
  const [hidden, setHidden] = useState(true)
  const [search, setSearch] = useState('')

  const btntxt = hidden ? 'Make a new customer' : 'cancel'
  const btnstyle = hidden || { color: 'error' }

  return (
    <article className="admin-customers-page">
      <header className="admin-customers-header">Customers</header>
      <div className="admin-customers-form-container">
        <div hidden={hidden} />
      </div>
      <div className="admin-customers-buttons">
        <Button variant="contained" {...btnstyle} onClick={() => setHidden(!hidden)}>{btntxt}</Button>
      </div>
      <div className="admin-customers-table">
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
              {customers
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
                        <Link style={{ textDecoration: 'none' }} to={`/admin/customers/${customer.id}`}>Look Up Flights</Link>
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

export default CustomersPage
