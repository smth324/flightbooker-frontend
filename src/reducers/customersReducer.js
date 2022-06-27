import customersService from '../services/customersService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const customersReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_CUSTOMER':
    return [...state, action.data]
  case 'INIT_CUSTOMERS':
    return action.data
  case 'UPDATE_CUSTOMER':
    return state.map((x) => (
      x.id === action.data.id ? action.data : x
    ))
  default:
    return state
  }
}

export const createCustomer = (params) => async (dispatch) => {
  try {
    const place = await customersService.create(params)
    dispatch({
      type: 'CREATE_CUSTOMER',
      data: place,
    })
    dispatch(changeNotification('Succesfully created a new place!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to create new place.', 5))
  }
}

export const toggleActivePlace = (place) => async (dispatch) => {
  try {
    const updatedPlac = await customersService.update(place.id, { ...place, active: !place.active })
    dispatch({
      type: 'UPDATE_CUSTOMER',
      data: updatedPlac,
    })
    dispatch(changeNotification('Succesfully updated a new place!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to update new place.', 5))
  }
}

export const initializeCustomers = () => async (dispatch) => {
  try {
    const places = await customersService.getAll()
    dispatch({
      type: 'INIT_CUSTOMERS',
      data: places,
    })
  } catch (e) {
    console.log(e)
  }
}

export default customersReducer
