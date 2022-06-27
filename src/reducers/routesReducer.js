import routesService from '../services/routesService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const routesReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_ROUTE':
    return [...state, action.data]
  case 'INIT_ROUTES':
    return action.data
  case 'DEL_ROUTE':
    return state.filter((x) => x.id !== action.data.id)
  case 'UPDATE_ROUTE':
    return state.map((x) => (
      x.id === action.data.id ? action.data : x
    ))
  default:
    return state
  }
}

export const createRoute = (params) => async (dispatch) => {
  try {
    const route = await routesService.create(params)
    dispatch({
      type: 'CREATE_ROUTE',
      data: route,
    })
    dispatch(changeNotification('Succesfully created a new route!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to create new route.', 5))
  }
}

export const initializeRoutes = () => async (dispatch) => {
  try {
    const routes = await routesService.getAll()
    dispatch({
      type: 'INIT_ROUTES',
      data: routes,
    })
  } catch (e) {
    console.log(e)
  }
}

export const deleteRoute = (route) => async (dispatch) => {
  try {
    await routesService.remove(route.id)
    dispatch({
      type: 'DEL_ROUTE',
      data: route,
    })
    dispatch(changeNotification('Succesfully deleted route.', 5))
  } catch (excpetion) {
    dispatch(changeNotification('Error: Failed to delete new route.', 5))
  }
}

export const toggleActiveRoute = (route) => async (dispatch) => {
  try {
    const updatedRoute = await routesService.update(route.id, { ...route, active: !route.active })
    dispatch({
      type: 'UPDATE_ROUTE',
      data: updatedRoute,
    })
    dispatch(changeNotification('Succesfully updated a new route!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to update new route.', 5))
  }
}

export default routesReducer
