import bookingsService from '../services/bookingsService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const bookingReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_BOOKING':
    return [...state, action.data]
  case 'INIT_BOOKINGS':
    return action.data
  case 'UPDATE_BOOKING':
    return state.map((x) => (
      x.id === action.data.id ? action.data : x
    ))
  default:
    return state
  }
}

export const initializeBookings = () => async (dispatch) => {
  try {
    const bookings = await bookingsService.getAll()
    dispatch({
      type: 'INIT_BOOKINGS',
      data: bookings,
    })
  } catch (e) {
    console.log(e)
  }
}

export const createBooking = (params) => async (dispatch) => {
  try {
    const booking = await bookingsService.create(params)
    dispatch({
      type: 'CREATE_BOOKING',
      data: booking,
    })
    dispatch(changeNotification('Succesfully created a new booking!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to create new booking.', 5))
  }
}

export const getCompleteBooking = (booking) => async (dispatch) => {
  try {
    const updatedBooking = await bookingsService.getOne(booking.id)
    dispatch({
      type: 'UPDATE_BOOKING',
      data: updatedBooking,
    })
  } catch (e) {
    dispatch(changeNotification('Error: Failed to update booking.', 5))
  }
}

export default bookingReducer
