import React, { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { format, parseISO } from 'date-fns'
import PromotionsForm from './PromotionsForm'
import { toggleActivePromotion } from '../../../reducers/promotionsReducer'
import './PromotionsPage.css'

const PromotionsPage = ({ promotions }) => {
  const [hidden, setHidden] = useState(true)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const btntxt = hidden ? 'Make a new promotion' : 'cancel'
  const btnstyle = hidden || { color: 'error' }

  const handleToggleActive = (promotion) => {
    dispatch(toggleActivePromotion(promotion))
  }

  return (
    <article className="admin-promotions-page">
      <header className="admin-promotions-header">Promotions</header>
      <div className="admin-promotions-form-container">
        <div hidden={hidden}>
          <PromotionsForm />
        </div>
      </div>
      <div className="admin-promotions-buttons">
        <Button variant="contained" {...btnstyle} onClick={() => setHidden(!hidden)}>{btntxt}</Button>
      </div>
      <div className="admin-promotions-table">
        <TextField className="admin-promotions-searchBar" label="Search" variant="filled" value={search} onChange={(event) => setSearch(event.target.value)} />
        <TableContainer component={Paper} style={{ maxHeight: 335 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Code</TableCell>
                <TableCell align="right">Promotion Percent</TableCell>
                <TableCell align="right">Expiry Date</TableCell>
                <TableCell align="right">Number Of Redemptions</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotions
                .map((promotion) => (
                  <TableRow
                    key={promotion.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{promotion.id}</TableCell>
                    <TableCell align="right">{promotion.code}</TableCell>
                    <TableCell align="right">
                      {promotion.promotionPercent}
                      %
                    </TableCell>
                    <TableCell align="right">{format(parseISO(promotion.expiryDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell align="right">{promotion.numberOfRedemptions}</TableCell>
                    <TableCell align="center"><Button variant="contained" onClick={() => handleToggleActive(promotion)} color={promotion.active ? 'success' : 'error'}>{promotion.active ? 'Active' : 'Not Active'}</Button></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </article>
  )
}

export default PromotionsPage
