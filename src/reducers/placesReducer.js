import placesService from '../services/placesService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const placesReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_PLACE':
    return [...state, action.data]
  case 'INIT_PLACES':
    return action.data
  case 'UPDATE_PLACE':
    return state.map((x) => (
      x.id === action.data.id ? action.data : x
    ))
  default:
    return state
  }
}

export const createPlace = (params) => async (dispatch) => {
  try {
    const place = await placesService.create(params)
    dispatch({
      type: 'CREATE_PLACE',
      data: place,
    })
    dispatch(changeNotification('Succesfully created a new place!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to create new place.', 5))
  }
}

export const toggleActivePlace = (place) => async (dispatch) => {
  try {
    const updatedPlace = await placesService.update(place.id, { ...place, active: !place.active })
    dispatch({
      type: 'UPDATE_PLACE',
      data: updatedPlace,
    })
    dispatch(changeNotification('Succesfully updated a new place!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to update new place.', 5))
  }
}

export const initializePlaces = () => async (dispatch) => {
  try {
    const places = await placesService.getAll()
    dispatch({
      type: 'INIT_PLACES',
      data: places,
    })
  } catch (e) {
    console.log(e)
  }
}

export default placesReducer
