import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import {
  TextField, Autocomplete,
} from '@mui/material'
import { DatePicker } from '@mui/lab'
import { format, parseISO } from 'date-fns'
import './BookingsForm.css'
import { useDispatch } from 'react-redux'
import SeatPicker from '../../SeatPicker'
import { createBooking } from '../../../../reducers/bookingsReducer'
import { changeNotification } from '../../../../reducers/notificationReducer'
import flightsService from '../../../../services/flightsService'

const BookingsForm = ({ flights }) => {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState(1)

  const [voucherCode, setVoucherCode] = useState('')
  const [promotionCode, setPromotionCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emergencyName, setEmergencyName] = useState('')
  const [emergencyPhone, setEmergencyPhone] = useState('')
  const [email, setEmail] = useState('')

  const [flight, setFlight] = useState(null)
  const [customers, setCustomers] = useState([{
    firstName: '',
    lastName: '',
    title: '',
    birthday: new Date(),
    type: '',
    seatId: {
      id: '',
      nameId: '',
    },
  }])
  const [planeLayout, setPlaneLayout] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const getLayout = async () => {
      const layoutBoxes = await flightsService.getOneLayout(flight?.id)
      const floorModels = []
      layoutBoxes.forEach((x) => {
        if (!Array.isArray(floorModels[x.floor])) {
          floorModels[x.floor] = []
        }
        floorModels[x.floor].push(x)
      })
      setPlaneLayout(floorModels)
    }
    if (flight) {
      getLayout()
    }
  }, [flight])

  const occupied = customers.map((x) => x.seatId.id)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (voucherCode === '' || promotionCode === '' || phoneNumber === '' || emergencyName === '' || emergencyPhone === '' || email === '' || flight === '') {
      dispatch(changeNotification('Error: Must fill out all fields', 5))
      return
    }
    dispatch(createBooking({
      booking: {
        voucherCode,
        promotionCode,
        phoneNumber,
        emergencyName,
        emergencyPhone,
        email,
        flightId: flight.id,
      },
      customers: customers.map((x) => {
        const toReturn = { ...x }
        toReturn.seatId = x.seatId.id
        return toReturn
      }),
    }))
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create new Booking
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="100%">
        <DialogTitle>Make a new booking</DialogTitle>
        <DialogContent sx={{
          display: 'flex', flexDirection: 'column', width: '90vw', height: '110vh',
        }}
        >
          {
            formState === 1
              ? (
                <>
                  <TextField sx={{ paddingBottom: 3, marginTop: 1 }} label="Voucher Code" value={voucherCode} onChange={(event) => setVoucherCode(event.target.value)} />
                  <TextField sx={{ paddingBottom: 3 }} label="Promotion Code" value={promotionCode} onChange={(event) => setPromotionCode(event.target.value)} />
                  <TextField sx={{ paddingBottom: 3 }} label="Phone Number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                  <TextField sx={{ paddingBottom: 3 }} label="Emergency Name" value={emergencyName} onChange={(event) => setEmergencyName(event.target.value)} />
                  <TextField sx={{ paddingBottom: 3 }} label="Emergency Phone" value={emergencyPhone} onChange={(event) => setEmergencyPhone(event.target.value)} />
                  <TextField sx={{ paddingBottom: 3 }} label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                  <Autocomplete
                    autoHighlight
                    autoComplete
                    autoSelect={false}
                    options={flights}
                    value={flight}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => (
                      `${option.route.origin.name} ----- ${option.route.destination.name} Departure: ${format(parseISO(option.departureDate), 'MMM dd, yyyy - HH:mm')} Arrival: ${format(parseISO(option.arrivalDate), 'MMM dd, yyyy - HH:mm')}`
                    )}
                    sx={{ marginTop: 1 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Flights" />}
                    onChange={(event, value) => setFlight(value)}
                  />
                </>
              )
              : (
                <>
                  {customers.map((x, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className="admin-booking-customer" key={`${i}`}>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Autocomplete
                          autoHighlight
                          autoComplete
                          autoSelect
                          options={['Master', 'Miss', 'Mr', 'Ms', 'Mrs']}
                          sx={{ paddingBottom: 3, width: 200 }}
                          renderInput={(params) => <TextField {...params} required label="Title" />}
                          onChange={(event, value) => setCustomers((prevCustomers) => {
                            const edited = [...prevCustomers]
                            edited[i].title = value
                            return edited
                          })}
                        />
                        <Autocomplete
                          autoHighlight
                          autoComplete
                          autoSelect
                          options={['Adult', 'Child']}
                          sx={{ paddingBottom: 3, width: 200 }}
                          renderInput={(params) => <TextField {...params} required label="Type" />}
                          onChange={(event, value) => setCustomers((prevCustomers) => {
                            const edited = [...prevCustomers]
                            edited[i].type = value
                            return edited
                          })}
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          sx={{ paddingBottom: 3 }}
                          label="First Name"
                          value={customers[i]?.firstName}
                          onChange={(event) => setCustomers((value) => {
                            const edited = [...value]
                            edited[i].firstName = event.target.value
                            return edited
                          })}
                        />
                        <TextField
                          required
                          sx={{ paddingBottom: 3 }}
                          label="Last Name"
                          value={customers[i]?.lastName}
                          onChange={(event) => setCustomers((value) => {
                            const edited = [...value]
                            edited[i].lastName = event.target.value
                            return edited
                          })}
                        />
                      </div>
                      <div>
                        <DatePicker
                          label="Birthday"
                          value={customers[i]?.birthday}
                          onChange={(dateValue) => setCustomers((value) => {
                            const edited = [...value]
                            edited[i].birthday = dateValue
                            return edited
                          })}
                          renderInput={(params) => (
                            <TextField {...params} required sx={{ paddingBottom: 3 }} />
                          )}
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          disabled
                          sx={{ paddingBottom: 3 }}
                          label="Seat"
                          value={customers[i]?.seatId?.nameId}
                        />
                        <SeatPicker
                          planeLayout={planeLayout.map((floor) => floor.map((box) => (occupied.includes(box.id) ? { ...box, type: 'occupied' } : box)))}
                          setCustomers={setCustomers}
                          customerIndex={i}
                        />
                      </div>
                    </div>
                  ))}
                  <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                  }}
                  >
                    <Button
                      sx={{ width: 200, marginBottom: 2 }}
                      color="success"
                      variant="contained"
                      onClick={() => setCustomers((value) => value.concat({
                        firstName: '',
                        lastName: '',
                        title: '',
                        birthday: new Date(),
                        type: '',
                        seatId: {
                          id: '',
                          nameId: '',
                        },
                      }))}
                    >
                      Add Customer
                    </Button>
                    <Button
                      sx={{ width: 200 }}
                      color="error"
                      variant="contained"
                      onClick={() => setCustomers((value) => {
                        const edited = [...value]
                        edited.pop()
                        return edited
                      })}
                    >
                      Remove Customer
                    </Button>
                  </div>
                </>
              )
          }
        </DialogContent>
        <DialogActions>
          <Button color="info" variant="contained" onClick={() => setFormState((value) => value - 1)}>Back</Button>
          <Button color="info" variant="contained" onClick={() => setFormState((value) => value + 1)}>Next</Button>
          <Button color="error" variant="contained" onClick={handleClose}>Cancel</Button>
          <Button color="success" variant="contained" onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BookingsForm
