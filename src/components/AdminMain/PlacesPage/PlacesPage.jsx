import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
} from '@mui/material'
import PlacesForm from './PlacesForm'
import './PlacesPage.css'
import { toggleActivePlace } from '../../../reducers/placesReducer'

const PlacesPage = ({ places }) => {
  const [hidden, setHidden] = useState(true)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const handleToggleActive = (place) => {
    dispatch(toggleActivePlace(place))
  }

  const btntxt = hidden ? 'Make a new place' : 'cancel'
  const btnstyle = hidden || { color: 'error' }

  return (
    <article className="admin-places-page">
      <header className="admin-places-header">Places</header>
      <div className="admin-places-form-container">
        <div hidden={hidden}>
          <PlacesForm />
        </div>
      </div>
      <div className="admin-places-buttons">
        <Button variant="contained" {...btnstyle} onClick={() => setHidden(!hidden)}>{btntxt}</Button>
      </div>
      <div className="admin-places-table">
        <TextField className="places-searchbar" label="Search" variant="filled" value={search} onChange={(event) => setSearch(event.target.value)} />
        <TableContainer component={Paper} style={{ maxHeight: 335 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {places.filter((x) => (
                x.name.toLowerCase().match(search.toLowerCase())
              )).map((place) => (
                <TableRow
                  key={place.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{place.id}</TableCell>
                  <TableCell align="center">{place.name}</TableCell>
                  <TableCell align="center"><Button variant="contained" onClick={() => handleToggleActive(place)} color={place.active ? 'success' : 'error'}>{place.active ? 'Active' : 'Not Active'}</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </article>
  )
}

export default PlacesPage
