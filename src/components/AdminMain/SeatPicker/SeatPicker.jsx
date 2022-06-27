/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useDispatch } from 'react-redux'
import { changeNotification } from '../../../reducers/notificationReducer'
import './SeatPicker.css'

const FormDialog = ({ planeLayout, setCustomers, customerIndex }) => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    if (!planeLayout[0]) {
      dispatch(changeNotification('Error: Pick a flight first', 5))
      return
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="100%">
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <SeatPicker
            planeLayout={planeLayout}
            setCustomers={setCustomers}
            customerIndex={customerIndex}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const SeatPicker = ({ planeLayout, setCustomers, customerIndex }) => {
  const [boxPlacements, setBoxPlacements] = useState(planeLayout)
  const floors = []
  for (let i = 0; i < boxPlacements.length; i += 1) {
    floors.push(
      <Floor
        customerIndex={customerIndex}
        key={i}
        floor={i}
        boxPlacements={boxPlacements}
        setBoxPlacements={setBoxPlacements}
        setCustomers={setCustomers}
      />,
    )
  }

  useEffect(() => {
    setBoxPlacements(planeLayout)
  }, [planeLayout])

  return (
    <div>
      <div style={{
        flexDirection: 'row', display: 'flex', justifyContent: 'center',
      }}
      >
        {floors}
      </div>
    </div>
  )
}

const Square = ({
  placeNumber,
  placeLetter,
  boxPlacements,
  floor,
  setCustomers,
  customerIndex,
}) => {
  const boxId = `${placeLetter}${placeNumber}`
  const boxPlacement = boxPlacements[floor].find((x) => x.placement === boxId)

  const currImg = boxPlacement?.type
  const inputValue = boxPlacement?.value || ''

  // handles placements
  const handleClick = () => {
    if (currImg === 'seat' || currImg === 'businessSeat' || currImg === 'premiumSeat') {
      setCustomers((value) => {
        const edited = [...value]
        edited[customerIndex].seatId = boxPlacement
        return edited
      })
    }
  }

  let styles = {}
  if (currImg === 'greyRight') {
    styles = { background: 'linear-gradient(to right, white 50%, grey 50%)' }
  } else if (currImg === 'greyLeft') {
    styles = { background: 'linear-gradient(to right, grey 50%, white 50%)' }
  } else if (currImg === 'exit') {
    styles = { backgroundColor: 'grey' }
  }

  return (
    <button type="button" style={styles} className={`rowss ${currImg === 'seat' || currImg === 'businessSeat' || currImg === 'premiumSeat' ? 'clickable' : ''}`} onClick={handleClick}>
      {currImg === 'seat' ? <EventSeatIcon className="icon" style={{ fill: 'blue' }} /> : null}
      {currImg === 'businessSeat' ? <EventSeatIcon className="icon" style={{ fill: '#ebbd34' }} /> : null}
      {currImg === 'premiumSeat' ? <EventSeatIcon className="icon" style={{ fill: 'green' }} /> : null}
      {currImg === 'exit' ? <LogoutIcon className="icon" style={{ fill: 'blue' }} /> : null}
      {currImg === 'occupied' ? <CloseIcon className="icon" /> : null }
      {currImg === 'editableColumn' || currImg === 'editableRow'
        ? <input className="input" value={inputValue} readOnly />
        : null}
    </button>
  )
}

const Column = ({
  numOfRows,
  placeLetter,
  boxPlacements,
  setBoxPlacements,
  floor,
  setCustomers,
  customerIndex,
}) => {
  const rows = []
  for (let i = 0; i < numOfRows; i += 1) {
    rows.push(<Square
      customerIndex={customerIndex}
      setCustomers={setCustomers}
      key={`${placeLetter}${i}`}
      placeLetter={placeLetter}
      placeNumber={i}
      boxPlacements={boxPlacements}
      setBoxPlacements={setBoxPlacements}
      floor={floor}
    />)
  }
  return (
    <div>
      {rows}
    </div>
  )
}

const Floor = ({
  boxPlacements, setBoxPlacements, floor, setCustomers, customerIndex,
}) => {
  const [numOfColumns] = useState(11)
  const [numOfRows] = useState(40)

  const placeLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
  const columns = []
  for (let i = 0; i < numOfColumns; i += 1) {
    columns.push(<Column
      customerIndex={customerIndex}
      setCustomers={setCustomers}
      numOfRows={numOfRows}
      placeLetter={placeLetters[i]}
      key={placeLetters[i]}
      boxPlacements={boxPlacements}
      setBoxPlacements={setBoxPlacements}
      floor={floor}
    />)
  }

  return (
    <div className="admin-planes">
      <article className="admin-planes-page" style={{ gridTemplateColumns: `repeat(${numOfColumns}, var(--square-length)` }}>
        {columns}
      </article>
    </div>
  )
}

export default FormDialog
