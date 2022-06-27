import React, { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PlaneModelsForm from './PlaneModelsForm'
import './PlaneModelsPage.css'
import { toggleActivePlaneModel } from '../../../reducers/planeModelsReducer'

const PlaneModelsPage = ({ planeModels }) => {
  const [hidden, setHidden] = useState(true)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const handleToggleActive = (planeModel) => {
    dispatch(toggleActivePlaneModel(planeModel))
  }

  const btntxt = hidden ? 'Make a new plane' : 'cancel'
  const btnstyle = hidden || { color: 'error' }

  return (
    <article className="admin-seatings-page">
      <header className="admin-seatings-header">Plane Models</header>
      <div className="admin-seatings-form-container">
        <div hidden={hidden}>
          <PlaneModelsForm />
        </div>
      </div>
      <div className="admin-seatings-buttons">
        <Button variant="contained" {...btnstyle} onClick={() => setHidden(!hidden)}>{btntxt}</Button>
      </div>
      <div className="admin-seatings-table">
        <TextField className="seatings-searchbar" label="Search" variant="filled" value={search} onChange={(event) => setSearch(event.target.value)} />
        <TableContainer component={Paper} style={{ maxHeight: 335 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Passenger Capacity</TableCell>
                <TableCell align="center">Cargo Capacity</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planeModels.filter((x) => (
                x.name.toLowerCase().match(search.toLowerCase())
              )).map((planeModel) => (
                <TableRow
                  key={planeModel.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{planeModel.id}</TableCell>
                  <TableCell align="center">{planeModel.name}</TableCell>
                  <TableCell component="th" align="center" scope="row">{planeModel.passengerCapacity}</TableCell>
                  <TableCell align="center">{`${planeModel.cargoCapacity} kg`}</TableCell>
                  <TableCell align="center"><Button variant="contained" onClick={() => handleToggleActive(planeModel)} color={planeModel.active ? 'success' : 'error'}>{planeModel.active ? 'Active' : 'Not Active'}</Button></TableCell>
                  <TableCell align="center">
                    <Button>
                      <Link style={{ textDecoration: 'none' }} to={`/admin/planeModels/${planeModel.id}`}>Look Up Model</Link>
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

export default PlaneModelsPage
