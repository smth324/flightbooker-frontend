import React, {
  useState, useEffect, useRef, useImperativeHandle,
} from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Autocomplete, TextField } from '@mui/material'
import { DatePicker } from '@mui/lab'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { differenceInYears } from 'date-fns'
import { changeNotification } from '../../../../reducers/notificationReducer'
import InfoBox from '../InfoBox'
import { useFormData } from '../../../../contexts/FormDataContext'
import flightsService from '../../../../services/flightsService'
import './BookingView.css'

const message = (
  <>
    <div className="selection-booking-infomessage">
      Passenger name(s) should match the name(s) on the passport or identification that you or your
      Passenger(s) may be required to provide upon check-in. No special characters and numbers
      should be entered in the name field. You must use and enter your Passenger details in English
      language characters.
    </div>
    <br />
    <div>
      Fields in
      {' '}
      <strong>bold with an asterisk (*) </strong>
      are mandatory to fill in
    </div>
  </>
)

const Passenger = React.forwardRef(({
  passengerNumber, setCustomers, customers, type,
}, ref) => {
  const [show, setShow] = useState(true)
  const [validated, setValidated] = useState(null)

  const dispatch = useDispatch()

  const customer = customers[passengerNumber]
  const validate = () => {
    if (!(customer.title === '' || customer.title === null || customer.firstName === '' || customer.lastName === '')) {
      if (type === 'adult') {
        if (differenceInYears(new Date(), new Date(customers[passengerNumber].birthday)) >= 12) {
          setValidated(true)
          setShow(false)
          return true
        }
        setValidated(false)
        setShow(true)
        dispatch(changeNotification('Error: Age must be 12 or above to be an adult', 5))
        return false
      } if (type === 'child') {
        if (differenceInYears(new Date(), new Date(customers[passengerNumber].birthday)) <= 12
      && differenceInYears(new Date(), new Date(customers[passengerNumber].birthday)) >= 3) {
          setValidated(true)
          setShow(false)
          return true
        }
        setValidated(false)
        setShow(true)
        dispatch(changeNotification('Error: Age must be between the ages of 3 and 12', 5))
        return false
      }
    }
    setValidated(false)
    setShow(true)
    dispatch(changeNotification('Error: Please fill out all the fields', 5))
    return false
  }

  const onSubmit = (event) => {
    event.preventDefault()
    validate()
  }

  const domRef = useRef()

  useImperativeHandle(ref, () => ({
    validate,
    scrollIntoView: (options) => {
      domRef.current.scrollIntoView(options)
    },
  }))

  const validatedStyle = {
    backgroundColor: '#005eb8',
    color: ' white',
  }

  const failedValidatedStyle = {
    backgroundColor: '#c30054',
    color: ' white',
  }

  let formStyle = {}
  if (validated === null) {
    formStyle = {}
  } else if (validated) {
    formStyle = validatedStyle
  } else {
    formStyle = failedValidatedStyle
  }

  return (
    <div className="selection-booking-passenger-container" ref={domRef}>
      <div className="selection-booking-passenger-header" role="button" onClick={() => setShow(!show)} tabIndex={0} onKeyDown={() => setShow(!show)} style={formStyle}>
        <div className="selection-booking-passenger-type">{type === 'adult' ? 'Adult' : 'Child'}</div>
        <div className="selection-booking-passenger-subheader" style={customer.firstName !== '' && customer.lastName !== '' ? { fontSize: '17px', marginTop: -10 } : {}}>
          {customer.firstName !== '' && customer.lastName !== '' ? `${customer.firstName}   ${customer.lastName}` : `Passenger ${passengerNumber + 1}`}
        </div>
        <div>
          {show ? <KeyboardArrowUpIcon className="selection-booking-passenger-header-icon" /> : <KeyboardArrowDownIcon className="selection-booking-passenger-header-icon" />}
        </div>
      </div>
      <form className="selection-booking-passenger-form" style={show ? {} : { height: '0px' }} onSubmit={onSubmit}>
        <div className="selection-booking-passenger-form-inner">
          <div className="selection-booking-passenger-form-title">Personal information</div>
          <Autocomplete
            autoHighlight
            autoComplete
            autoSelect
            options={['Master', 'Miss', 'Mr', 'Ms', 'Mrs', '']}
            sx={{ paddingBottom: 3, width: 200 }}
            value={customers[passengerNumber].title}
            renderInput={(params) => <TextField {...params} required label="Title" />}
            onChange={(event, value) => setCustomers((prevCustomers) => {
              const edited = [...prevCustomers]
              edited[passengerNumber].title = value
              return edited
            })}
          />
          <TextField
            required
            sx={{ paddingBottom: 3 }}
            label="First Name"
            value={customers[passengerNumber].firstName}
            onChange={(event) => setCustomers((value) => {
              const edited = [...value]
              edited[passengerNumber].firstName = event.target.value
              return edited
            })}
          />
          <TextField
            required
            sx={{ paddingBottom: 3 }}
            label="Last Name"
            value={customers[passengerNumber]?.lastName}
            onChange={(event) => setCustomers((value) => {
              const edited = [...value]
              edited[passengerNumber].lastName = event.target.value
              return edited
            })}
          />
          <div>
            <DatePicker
              label="Birthday"
              value={customers[passengerNumber]?.birthday}
              onChange={(dateValue) => setCustomers((value) => {
                const edited = [...value]
                edited[passengerNumber].birthday = dateValue
                return edited
              })}
              renderInput={(params) => (
                <TextField {...params} sx={{ paddingBottom: 3 }} />
              )}
            />
          </div>
          <div className="selection-booking-validate-btn-container">
            <button type="submit" className="selection-booking-validate-btn">
              Validate information
            </button>
          </div>
        </div>
      </form>
    </div>
  )
})

const BookingView = React.forwardRef(({
  customers, setCustomers, booking, setBooking, setLayout,
}, ref) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formData = useFormData()

  useEffect(() => {
    if (!formData.flight) {
      navigate('/selection/select/times')
      return
    }
    const getLayout = async () => {
      const receivedLayout = await flightsService.getOneLayout(formData.flight.id)
      const seating = []
      receivedLayout.forEach((x) => {
        if (!Array.isArray(seating[x.floor])) {
          seating[x.floor] = []
        }
        seating[x.floor].push(x)
      })
      setLayout(seating)
    }
    getLayout()
  }, [])

  const refs = useRef([])

  const adults = []
  for (let i = 0; i < formData.adult; i += 1) {
    adults.push(
      // eslint-disable-next-line no-return-assign
      <Passenger passengerNumber={i} setCustomers={setCustomers} customers={customers} key={i} type="adult" ref={(el) => refs.current[i] = el} />,
    )
  }

  const children = []
  for (let i = formData.adult; i < formData.adult + formData.child; i += 1) {
    children.push(
      // eslint-disable-next-line no-return-assign
      <Passenger passengerNumber={i} setCustomers={setCustomers} customers={customers} key={i} type="child" ref={(el) => refs.current[i] = el} />,
    )
  }

  const nextPage = () => {
    let validated = true
    for (let i = 0; i < formData.adult + formData.child; i += 1) {
      if (!refs.current[i].validate()) {
        refs.current[i].scrollIntoView({ behavior: 'smooth' })
        validated = false
        break
      }
    }
    if (!validated) {
      return
    }
    if (!(booking.email === '' || booking.reemail === '' || booking.phoneNumber === '' || booking.emergencyPhone === '' || booking.emergencyName === '')) {
      if (booking.email === booking.reemail) {
        navigate('/selection/book/seats')
        return
      }
      dispatch(changeNotification('Error: Email does not match', 5))
      return
    }
    dispatch(changeNotification('Error: Please fill out all the forms', 5))
  }
  useImperativeHandle(ref, () => ({
    nextPage,
  }))
  return (
    <>
      <InfoBox message={message} />
      <div />
      {adults}
      {children}
      <div className="selection-booking-contact">
        <div className="selection-booking-contact-header">
          <MailOutlineIcon className="selection-booking-contact-icon" />
          Contact Information
        </div>
        <div className="selection-booking-contact-main">
          <div className="selection-booking-contact-top">
            <div className="selection-booking-contact-top-left">
              <div className="selection-booking-contact-top-left-header">Email</div>
              <div>
                <TextField
                  required
                  sx={{ paddingBottom: 3 }}
                  label="E-mail"
                  value={booking.email}
                  onChange={(event) => setBooking((value) => {
                    const edited = { ...value }
                    edited.email = event.target.value
                    return edited
                  })}
                />
              </div>
              <div>
                <TextField
                  required
                  sx={{ paddingBottom: 3 }}
                  label="Re-enter E-mail:"
                  value={booking.reemail}
                  onChange={(event) => setBooking((value) => {
                    const edited = { ...value }
                    edited.reemail = event.target.value
                    return edited
                  })}
                />
              </div>
            </div>
            <div>
              <div className="selection-booking-contact-top-right-header">
                Phones
              </div>
              <div>
                <TextField
                  required
                  sx={{ paddingBottom: 3 }}
                  label="Mobile Phone"
                  value={booking.phoneNumber}
                  onChange={(event) => setBooking((value) => {
                    const edited = { ...value }
                    edited.phoneNumber = event.target.value
                    return edited
                  })}
                />
              </div>
            </div>
          </div>
          <div className="selection-booking-contact-bottom">
            <div className="selection-booking-contact-bottom-left">
              <div className="selection-booking-contact-bottom-left-header">Emergency contact</div>
              <div>
                <TextField
                  required
                  sx={{ paddingBottom: 3 }}
                  label="Emergency Name"
                  value={booking.emergencyName}
                  onChange={(event) => setBooking((value) => {
                    const edited = { ...value }
                    edited.emergencyName = event.target.value
                    return edited
                  })}
                />
              </div>

            </div>
            <div>
              <div>
                <TextField
                  required
                  sx={{ paddingBottom: 3 }}
                  label="Emergency Phone"
                  value={booking.emergencyPhone}
                  onChange={(event) => setBooking((value) => {
                    const edited = { ...value }
                    edited.emergencyPhone = event.target.value
                    return edited
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="selection-page-continue-container">
        <button type="button" className="selection-page-continue-btn" onClick={nextPage}>
          CONTINUE
          <ArrowRightIcon />
        </button>
      </div>
    </>
  )
})

export default BookingView
