import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  TextField, Button, TableContainer, Paper, TableRow, TableCell, Table, TableBody, TableHead,
} from '@mui/material'
import './PlanesPage.css'
import { toggleActivePlane } from '../../../reducers/planesReducer'
import PlanesForm from './PlanesForm'

const PlanesPage = ({ planes, planeModels }) => {
  const [hidden, setHidden] = useState(true)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const handleToggleActive = (plane) => {
    dispatch(toggleActivePlane(plane))
  }

  const btntxt = hidden ? 'Make a new plane' : 'cancel'
  const btnstyle = hidden || { color: 'error' }

  return (
    <article className="adminPlanesPage">
      <header className="admin-planes-header">Planes</header>
      <div className="admin-planes-form-container">
        <div hidden={hidden}>
          <PlanesForm planeModels={planeModels} />
        </div>
      </div>
      <div className="admin-planes-buttons">
        <Button variant="contained" {...btnstyle} onClick={() => setHidden(!hidden)}>{btntxt}</Button>
      </div>
      <div className="admin-planes-table">
        <TextField className="planes-searchbar" label="Search" variant="filled" value={search} onChange={(event) => setSearch(event.target.value)} />
        <TableContainer component={Paper} style={{ maxHeight: 335 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Model</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planes.filter((x) => (
                x.name.toLowerCase().includes(search.toLowerCase())
              ))
                .map((plane) => (
                  <TableRow
                    key={plane.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{plane.id}</TableCell>
                    <TableCell align="right">{plane.name}</TableCell>
                    <TableCell align="right">{plane.model.name}</TableCell>
                    <TableCell align="center"><Button variant="contained" onClick={() => handleToggleActive(plane)} color={plane.active ? 'success' : 'error'}>{plane.active ? 'Active' : 'Not Active'}</Button></TableCell>
                    <TableCell align="center">
                      <Button>
                        <Link style={{ textDecoration: 'none' }} to={`/admin/planes/${plane.id}`}>Look Up Flights</Link>
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
export default PlanesPage
