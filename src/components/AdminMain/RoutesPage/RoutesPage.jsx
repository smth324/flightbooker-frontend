import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
} from '@mui/material'
import { Link } from 'react-router-dom'
import RoutesForm from './RoutesForm'
import { toggleActiveRoute } from '../../../reducers/routesReducer'
import './RoutesPage.css'

const RoutesPage = ({ routes, places }) => {
  const [hidden, setHidden] = useState(true)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const handleToggleActive = (route) => {
    dispatch(toggleActiveRoute(route))
  }

  const btntxt = hidden ? 'Make a new route' : 'cancel'
  const btnstyle = hidden || { color: 'error' }

  return (
    <article className="admin-routes-page">
      <header className="admin-routes-header">Routes</header>
      <div className="admin-routes-form-container">
        <div hidden={hidden}>
          <RoutesForm places={places} />
        </div>
      </div>
      <div className="admin-routes-buttons">
        <Button variant="contained" {...btnstyle} onClick={() => setHidden(!hidden)}>{btntxt}</Button>
      </div>
      <div className="admin-routes-table">
        <TextField className="admin-routes-searchBar" label="Search" variant="filled" value={search} onChange={(event) => setSearch(event.target.value)} />
        <TableContainer component={Paper} style={{ maxHeight: 335 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Origin</TableCell>
                <TableCell align="right">Destination</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.filter((x) => (
                x.origin.name.toLowerCase().includes(search.toLowerCase())
                || x.destination.name.toLowerCase().includes(search.toLowerCase())))
                .map((route) => (
                  <TableRow
                    key={route.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{route.id}</TableCell>
                    <TableCell align="right">{route.origin.name}</TableCell>
                    <TableCell align="right">{route.destination.name}</TableCell>
                    <TableCell align="center"><Button variant="contained" onClick={() => handleToggleActive(route)} color={route.active ? 'success' : 'error'}>{route.active ? 'Active' : 'Not Active'}</Button></TableCell>
                    <TableCell align="center">
                      <Button>
                        <Link style={{ textDecoration: 'none' }} to={`/admin/routes/${route.id}`}>Look Up Flights</Link>
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

export default RoutesPage
