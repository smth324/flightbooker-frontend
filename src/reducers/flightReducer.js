import flightService from '../services/flightsService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const flightReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_FLIGHT':
    return [...state, action.data]
  case 'INIT_FLIGHTS':
    return action.data
  default:
    return state
  }
}

export const initializeFlights = () => async (dispatch) => {
  try {
    const flights = await flightService.getAll()
    dispatch({
      type: 'INIT_FLIGHTS',
      data: flights,
    })
  } catch (e) {
    console.log(e)
  }
}

export const createFlight = (params) => async (dispatch) => {
  try {
    const flight = await flightService.create(params)
    dispatch({
      type: 'CREATE_FLIGHT',
      data: flight,
    })
    dispatch(changeNotification('Succesfully created a new flight!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to create new flight.', 5))
  }
}

export default flightReducer
