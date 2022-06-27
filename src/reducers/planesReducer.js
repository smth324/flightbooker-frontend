import planesService from '../services/planesService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const planesReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_PLANE':
    return [...state, action.data]
  case 'INIT_PLANES':
    return action.data
  case 'DEL_PLANE':
    return state.filter((x) => x.id !== action.data.id)
  case 'UPDATE_PLANE':
    return state.map((x) => (
      x.id === action.data.id ? action.data : x
    ))
  default:
    return state
  }
}

export const createPlane = (params) => async (dispatch) => {
  try {
    const plane = await planesService.create(params)
    dispatch({
      type: 'CREATE_PLANE',
      data: plane,
    })
    dispatch(changeNotification('Succesfully created a new plane!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to create new plane.', 5))
  }
}

export const initializePlanes = () => async (dispatch) => {
  try {
    const planes = await planesService.getAll()
    dispatch({
      type: 'INIT_PLANES',
      data: planes,
    })
  } catch (e) {
    console.log(e)
  }
}

export const deletePlane = (plane) => async (dispatch) => {
  try {
    await planesService.remove(plane.id)
    dispatch({
      type: 'DEL_PLANE',
      data: plane,
    })
    dispatch(changeNotification('Succesfully deleted plane.', 5))
  } catch (excpetion) {
    dispatch(changeNotification('Error: Failed to delete new plane.', 5))
  }
}

export const toggleActivePlane = (plane) => async (dispatch) => {
  try {
    const updatePlane = await planesService.update(
      plane.id,
      { ...plane, active: !plane.active },
    )
    dispatch({
      type: 'UPDATE_PLANE',
      data: updatePlane,
    })
    dispatch(changeNotification('Succesfully updated a new plane!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to update new plane.', 5))
  }
}

export default planesReducer
