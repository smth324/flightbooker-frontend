/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import './SeatPicker.css'

const SeatPicker = ({
  planeLayout, setCustomers, customerIndex, cabinClass, customers,
}) => {
  const [boxPlacements, setBoxPlacements] = useState([])
  const floors = []

  // determines which seats to show based on cabin class selection
  const toShow = [1]
  let smallest
  let biggest
  if (cabinClass === 'Economy') {
    const seats = planeLayout.flat().filter((x) => x.type === 'seat').map((x) => parseInt(x.placement.substring(1), 10))
    smallest = Math.min(...seats)
    biggest = Math.max(...seats)
  }
  if (cabinClass === 'Business') {
    const businessSeats = planeLayout.flat().filter((x) => x.type === 'businessSeat').map((x) => parseInt(x.placement.substring(1), 10))
    smallest = Math.min(...businessSeats)
    biggest = Math.max(...businessSeats)
  }
  if (cabinClass === 'Premium Economy') {
    const premiumSeats = planeLayout.flat().filter((x) => x.type === 'premiumSeat').map((x) => parseInt(x.placement.substring(1), 10))
    smallest = Math.min(...premiumSeats)
    biggest = Math.max(...premiumSeats)
  }
  for (let i = smallest; i <= biggest; i += 1) {
    toShow.push(i)
  }

  const customerSeats = customers.map((x) => x?.seatId?.placement)
  for (let i = 0; i < boxPlacements.length; i += 1) {
    floors.push(
      <Floor
        customerSeats={customerSeats}
        customerIndex={customerIndex}
        key={i}
        floor={i}
        boxPlacements={boxPlacements}
        setBoxPlacements={setBoxPlacements}
        setCustomers={setCustomers}
        toShow={toShow}
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
  customerSeats,
}) => {
  const boxPlacement = boxPlacements[floor].find((x) => x.placement === `${placeLetter}${placeNumber}`)

  const currImg = boxPlacement?.type

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
      {currImg === 'occupied'
        ? customerSeats.includes(`${placeLetter}${placeNumber}`)
          ? <div className="selected">{customerSeats.indexOf(`${placeLetter}${placeNumber}`) + 1}</div>
          : <CloseIcon className="icon" />
        : null}
      {currImg === 'editableColumn' || currImg === 'editableRow'
        ? boxPlacement?.value
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
  toShow,
  customerSeats,
}) => {
  const rows = []
  for (let i = 0; i < numOfRows; i += 1) {
    if (toShow.includes(i)) {
      rows.push(<Square
        customerIndex={customerIndex}
        setCustomers={setCustomers}
        key={`${placeLetter}${i}`}
        placeLetter={placeLetter}
        placeNumber={i}
        boxPlacements={boxPlacements}
        setBoxPlacements={setBoxPlacements}
        floor={floor}
        customerSeats={customerSeats}
      />)
    }
  }
  return (
    <div>
      {rows}
    </div>
  )
}

const Floor = ({
  boxPlacements, setBoxPlacements, floor, setCustomers, customerIndex, toShow, customerSeats,
}) => {
  const numOfColumns = 11
  const numOfRows = 40
  const placeLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
  const columns = []
  for (let i = 0; i < numOfColumns; i += 1) {
    columns.push(<Column
      customerSeats={customerSeats}
      customerIndex={customerIndex}
      setCustomers={setCustomers}
      numOfRows={numOfRows}
      placeLetter={placeLetters[i]}
      key={placeLetters[i]}
      boxPlacements={boxPlacements}
      setBoxPlacements={setBoxPlacements}
      floor={floor}
      toShow={toShow}
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

export default SeatPicker
