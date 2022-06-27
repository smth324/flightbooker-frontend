import planeModelsService from '../services/planeModelsService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const PlaneModelsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_PLANEMODEL':
    return [...state, action.data]
  case 'INIT_PLANEMODELS':
    return action.data
  case 'DEL_PLANEMODELS':
    return state.filter((x) => x.id !== action.data.id)
  case 'UPDATE_PLANEMODEL':
    return state.map((x) => (
      x.id === action.data.id ? action.data : x
    ))
  default:
    return state
  }
}

export const createPlaneModels = (params) => async (dispatch) => {
  try {
    const planeModels = await planeModelsService.create(params)
    dispatch({
      type: 'CREATE_PLANEMODEL',
      data: planeModels,
    })
    dispatch(changeNotification('Succesfully created a new layout boxes!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to create new layout boxes.', 5))
  }
}

export const initializePlaneModels = () => async (dispatch) => {
  try {
    const planeModels = await planeModelsService.getAll()
    dispatch({
      type: 'INIT_PLANEMODELS',
      data: planeModels,
    })
  } catch (e) {
    console.log(e)
  }
}

export const toggleActivePlaneModel = (planeModel) => async (dispatch) => {
  try {
    const updatedPlaneModel = await planeModelsService.update(
      planeModel.id,
      { ...planeModel, active: !planeModel.active },
    )
    dispatch({
      type: 'UPDATE_PLANEMODEL',
      data: updatedPlaneModel,
    })
    dispatch(changeNotification('Succesfully updated a new plane model!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to update new plane model.', 5))
  }
}

export const getCompletePlaneModel = (planeModel) => async (dispatch) => {
  try {
    const updatedPlaneModel = await planeModelsService.getOne(planeModel.id)
    dispatch({
      type: 'UPDATE_PLANEMODEL',
      data: updatedPlaneModel,
    })
  } catch (e) {
    dispatch(changeNotification('Error: Failed to update plane model.', 5))
  }
}

export default PlaneModelsReducer
