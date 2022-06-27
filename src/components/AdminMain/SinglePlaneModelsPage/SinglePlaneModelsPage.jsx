/* eslint-disable no-unused-expressions */
import React, { useLayoutEffect, useEffect, useState } from 'react'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch } from 'react-redux'
import { getCompletePlaneModel } from '../../../reducers/planeModelsReducer'
import './SinglePlaneModelsPage.css'

const SinglePlaneModelsPage = ({ planeModel }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompletePlaneModel(planeModel))
  }, [])

  return (
    <div>
      {planeModel.id}
      {planeModel.layoutBoxes ? <FormDialog planeModel={planeModel} /> : 'noboxes'}
    </div>
  )
}

const FormDialog = ({ planeModel }) => {
  const [boxPlacements, setBoxPlacements] = useState([[]])

  useLayoutEffect(() => {
    const floor0 = []
    const floor1 = []
    planeModel.layoutBoxes.forEach((x) => {
      if (x.floor === 0) {
        floor0.push(x)
      } else {
        floor1.push(x)
      }
    })
    setBoxPlacements([floor0])
  }, [])
  const floors = []
  for (let i = 0; i < boxPlacements.length; i += 1) {
    floors.push(
      <Floor
        key={i}
        floor={i}
        boxPlacements={boxPlacements}
        setBoxPlacements={setBoxPlacements}
      />,
    )
  }
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
  setLetterColumn, setRow, floor,
}) => {
  const boxId = `${placeLetter}${placeNumber}`
  const boxPlacement = boxPlacements[floor].find((x) => x.placement === boxId)

  const currImg = boxPlacement?.type
  const inputValue = boxPlacement?.value || ''

  // sets letterColumn and rowNumber on first render
  useEffect(() => {
    boxPlacement?.type === 'editableColumn' && setLetterColumn(boxPlacement?.value || null)
    boxPlacement?.type === 'editableRow' && setRow(placeNumber, boxPlacement?.value || null)
  }, [])

  // handles placements
  const handleClick = () => {
    //
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
    <button type="button" style={styles} className="rowss" onFocus={handleClick} onMouseOver={handleClick} onMouseDown={handleClick}>
      {currImg === 'seat' ? <EventSeatIcon className="icon" style={{ fill: 'blue' }} /> : null}
      {currImg === 'businessSeat' ? <EventSeatIcon className="icon" style={{ fill: '#ebbd34' }} /> : null}
      {currImg === 'premiumSeat' ? <EventSeatIcon className="icon" style={{ fill: 'green' }} /> : null}
      {currImg === 'exit' ? <LogoutIcon className="icon" style={{ fill: 'blue' }} /> : null}
      {currImg === 'editableColumn' || currImg === 'editableRow'
        ? <input className="input" value={inputValue} readOnly />
        : null}
    </button>
  )
}

const Column = ({
  numOfRows,
  placeLetter, boxPlacements, setBoxPlacements, rowNumbers, setRowNumbers, floor,
}) => {
  const [letterColumn, setLetterColumn] = useState(null)

  // sets the rowNumber for nameId
  const setRow = (row, number) => {
    setRowNumbers((value) => {
      const edited = [...value]
      edited[row] = number
      return edited
    })
  }

  const rows = []
  for (let i = 0; i < numOfRows; i += 1) {
    rows.push(<Square
      key={`${placeLetter}${i}`}
      placeLetter={placeLetter}
      placeNumber={i}
      boxPlacements={boxPlacements}
      setBoxPlacements={setBoxPlacements}
      letterColumn={letterColumn}
      setLetterColumn={setLetterColumn}
      rowNumber={rowNumbers[i] || null}
      setRow={setRow}
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
  option, boxPlacements, setBoxPlacements, floor,
}) => {
  const maxRows = 50

  const [numOfColumns] = useState(11)
  const [numOfRows] = useState(40)
  const [rowNumbers, setRowNumbers] = useState(Array(maxRows).fill(null))

  const placeLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
  const columns = []
  for (let i = 0; i < numOfColumns; i += 1) {
    columns.push(<Column
      numOfRows={numOfRows}
      option={option}
      placeLetter={placeLetters[i]}
      key={placeLetters[i]}
      boxPlacements={boxPlacements}
      setBoxPlacements={setBoxPlacements}
      rowNumbers={rowNumbers}
      setRowNumbers={setRowNumbers}
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
export default SinglePlaneModelsPage
