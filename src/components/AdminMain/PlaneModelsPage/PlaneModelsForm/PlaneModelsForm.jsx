/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import LogoutIcon from '@mui/icons-material/Logout'
import './PlaneModelsForm.css'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import data from './help'
import { changeNotification } from '../../../../reducers/notificationReducer'
import { createPlaneModels } from '../../../../reducers/planeModelsReducer'

const FormDialog = () => {
  const [open, setOpen] = useState(false)
  const [option, setOption] = useState('')
  const [boxPlacements, setBoxPlacements] = useState([data])
  const [numOfFloors, setNumOfFloors] = useState(boxPlacements.length)

  const [name, setName] = useState('')
  const [cargoCapacity, setCargoCapacity] = useState(0)
  const [passengerCapacity, setPassengerCapacity] = useState(0)

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (name === '' || cargoCapacity === 0 || passengerCapacity === 0) {
      dispatch(changeNotification('Error: Must Provide a all fields.', 5))
      return
    }
    dispatch(createPlaneModels({
      floors: boxPlacements, name, cargoCapacity, passengerCapacity,
    }))
    dispatch(changeNotification('Info: It might take a while...', 5))
    setOpen(false)
  }

  const floors = []
  for (let i = 0; i < numOfFloors; i += 1) {
    floors.push(
      <Floor
        option={option}
        key={i}
        floor={i}
        boxPlacements={boxPlacements}
        setBoxPlacements={setBoxPlacements}
      />,
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-planeModels-form">
        <TextField sx={{ width: 300, paddingRight: 3 }} label="Plane Model Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
        <TextField sx={{ width: 300, paddingRight: 3 }} InputProps={{ endAdornment: <InputAdornment position="end">persons</InputAdornment> }} label="Passenger Capacity" variant="outlined" value={passengerCapacity} onChange={(event) => setPassengerCapacity(event.target.value)} />
        <TextField sx={{ width: 300, paddingRight: 3 }} InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }} label="Cargo Capacity (kg)" variant="outlined" value={cargoCapacity} onChange={(event) => setCargoCapacity(event.target.value)} />
        <Button variant="contained" onClick={handleClickOpen} sx={{ width: 300 }}>
          Open seat form
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth="100%">
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
            Make an arrangement
          </DialogTitle>
          <DialogContent id="scrollable">
            <section className="control-panel">
              <button type="button" onClick={() => setOption('seat')}>
                <EventSeatIcon className="icon" style={{ fill: 'blue' }} />
              </button>
              <button type="button" onClick={() => setOption('businessSeat')}>
                <EventSeatIcon className="icon" style={{ fill: '#ebbd34' }} />
              </button>
              <button type="button" onClick={() => setOption('premiumSeat')}>
                <EventSeatIcon className="icon" style={{ fill: 'green' }} />
              </button>
              <button type="button" onClick={() => setOption('')}>
                Empty
              </button>
              <button type="button" onClick={() => setOption('greyRight')}>
                <div className="greyRightbtn-inner" />
              </button>
              <button type="button" onClick={() => setOption('greyLeft')}>
                <div className="greyLeftbtn-inner" />
              </button>
              <button type="button" onClick={() => setOption('exit')}>
                <div className="exitIconbtn-inner"><LogoutIcon className="icon" style={{ fill: 'blue' }} /></div>
              </button>
              <button type="button" onClick={() => setOption('editableColumn')}>
                Edit Column
              </button>
              <button type="button" onClick={() => setOption('editableRow')}>
                Edit Row
              </button>
              <button
                type="button"
                onClick={() => setNumOfFloors((value) => {
                  boxPlacements.length < numOfFloors + 1
                    ? setBoxPlacements(boxPlacements.concat([[]]))
                    : null
                  return value + 1
                })}
              >
                Add Floor
              </button>
              <button type="button" onClick={() => setNumOfFloors((value) => value - 1)}>
                Remove Floor
              </button>
            </section>
            <div style={{
              flexDirection: 'row', display: 'flex', justifyContent: 'center',
            }}
            >
              {floors}
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="info" onClick={handleClose}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Button variant="contained" color="success" type="submit">Create new plane model</Button>
    </form>
  )
}

const Square = ({
  option,
  placeNumber,
  placeLetter,
  boxPlacements,
  setBoxPlacements, setLetterColumn, letterColumn, setRow, rowNumber, floor,
}) => {
  const boxId = `${placeLetter}${placeNumber}`
  const nameId = `${letterColumn}${rowNumber}`
  const boxPlacement = boxPlacements[floor].find((x) => x.placement === boxId)
  const dispatch = useDispatch()

  const [currImg, setCurrImg] = useState(boxPlacement?.type)
  const [inputValue, setInputValue] = useState(boxPlacement?.value || '')

  // sets letterColumn and rowNumber on first render
  useEffect(() => {
    boxPlacement?.type === 'editableColumn' && setLetterColumn(boxPlacement?.value || null)
    boxPlacement?.type === 'editableRow' && setRow(placeNumber, boxPlacement?.value || null)
  }, [])

  // updates the nameId of seats whenever rownumber or letterColumn changes
  useEffect(() => {
    (currImg === 'businessSeat' || currImg === 'premiumSeat' || currImg === 'seat')
    && setBoxPlacements((value) => {
      const edited = [...value[floor]]
      const index = edited.findIndex((x) => x.placement === boxId)
      edited[index] = {
        type: currImg, placement: boxId, nameId,
      }
      const qwer = [...value]
      qwer[floor] = edited
      return qwer
    })
  }, [rowNumber, letterColumn])

  // updates the state depending on the option
  const createPlacement = (editable) => {
    if (option === 'seat' || option === 'premiumSeat' || option === 'businessSeat') {
      setBoxPlacements((value) => {
        const edited = [...value]
        edited[floor] = value[floor].find((x) => x.placement === boxId)
          ? value[floor].map((x) => (x.placement === boxId
            ? { type: option, placement: boxId, nameId }
            : x))
          : value[floor].concat({ type: option, placement: boxId, nameId })
        return edited
      })
      return
    }

    if (!editable) {
      setBoxPlacements((value) => {
        const edited = [...value]
        edited[floor] = value[floor].find((x) => x.placement === boxId)
          ? value[floor].map((x) => (x.placement === boxId
            ? { type: option, placement: boxId }
            : x))
          : value[floor].concat({ type: option, placement: boxId })
        return edited
      })
    } else {
      setBoxPlacements((value) => {
        const edited = [...value]
        edited[floor] = value[floor].find((x) => x.placement === boxId)
          ? value[floor].map((x) => (x.placement === boxId
            ? { type: option, placement: boxId }
            : x))
          : value[floor].concat({
            type: option, placement: boxId, value: editable,
          })
        return edited
      })
    }
  }

  // handles placements
  const handleClick = (event) => {
    if (event.buttons <= 0) return
    setCurrImg(option)
    if (option === '') {
      setBoxPlacements((value) => {
        const edited = [...value]
        edited[floor] = value[floor].filter((x) => x.placement !== boxId)
        return edited
      })
      if (inputValue === letterColumn) {
        setInputValue('')
        setLetterColumn(null)
      }
      if (inputValue === String(rowNumber)) {
        setInputValue('')
        setRow(placeNumber, null)
      }
    } else if (option !== 'editableColumn' && option !== 'editableRow') {
      createPlacement()
    }
  }

  // handles column and row number changes
  const handleBlur = (e) => {
    const { value } = e.target
    if (option === 'editableColumn') {
      if (letterColumn === null || value === letterColumn) {
        setInputValue(value)
        setLetterColumn(value)
        createPlacement(value)
      } else {
        dispatch(changeNotification('Error: You cannot do that. Remove column with empty', 5))
        if (boxPlacement) {
          setInputValue(boxPlacement.value)
        } else {
          setInputValue('')
        }
      }
    } else if (option === 'editableRow') {
      if (rowNumber === null || value === rowNumber) {
        setRow(placeNumber, value)
        createPlacement(value)
        setInputValue(value)
      } else {
        dispatch(changeNotification('Error: You cannot do that. Remove column with empty', 5))
        if (boxPlacement) {
          setInputValue(boxPlacement.value)
        } else {
          setInputValue('')
        }
      }
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
    <button type="button" style={styles} className="rows" onFocus={handleClick} onMouseOver={handleClick} onMouseDown={handleClick}>
      {currImg === 'seat' ? <EventSeatIcon className="icon" style={{ fill: 'blue' }} /> : null}
      {currImg === 'businessSeat' ? <EventSeatIcon className="icon" style={{ fill: '#ebbd34' }} /> : null}
      {currImg === 'premiumSeat' ? <EventSeatIcon className="icon" style={{ fill: 'green' }} /> : null}
      {currImg === 'exit' ? <LogoutIcon className="icon" style={{ fill: 'blue' }} /> : null}
      {currImg === 'editableColumn' || currImg === 'editableRow'
        ? <input className="input" autoComplete="off" value={inputValue} onBlur={handleBlur} onInput={(event) => setInputValue(event.target.value)} />
        : null}
    </button>
  )
}

const Column = ({
  numOfRows,
  option,
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
      option={option}
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
  const minColumns = 5
  const maxColumns = 20
  const minRows = 5
  const maxRows = 50

  const [numOfColumns, setNumOfColumns] = useState(11)
  const [numOfRows, setNumOfRows] = useState(40)
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
      <div className="control-size">
        <button type="button" onClick={() => setNumOfColumns(numOfColumns + 1)} hidden={numOfColumns >= maxColumns}>Add Columns</button>
        <button type="button" onClick={() => setNumOfColumns(numOfColumns - 1)} hidden={numOfColumns <= minColumns}>Minus Columns</button>
        <button
          type="button"
          onClick={() => {
            setNumOfRows(numOfRows + 1)
            const modal = document.getElementById('scrollable')
            modal.scrollTo({
              top: modal.scrollHeight,
              left: 0,
              behavior: 'smooth',
            })
          }}
          hidden={numOfRows >= maxRows}
        >
          Add Rows
        </button>
        <button type="button" onClick={() => setNumOfRows(numOfRows - 1)} hidden={numOfRows <= minRows}>Minus Rows</button>
      </div>
      <article className="admin-planes-page" style={{ gridTemplateColumns: `repeat(${numOfColumns}, var(--square-length)` }}>
        {columns}
      </article>
    </div>
  )
}

export default FormDialog
