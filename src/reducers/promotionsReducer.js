import promotionsService from '../services/promotionsService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const PromtoionsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_PROMOTION':
    return [...state, action.data]
  case 'INIT_PROMOTIONS':
    return action.data
  case 'UPDATE_PROMOTION':
    return state.map((x) => (
      x.id === action.data.id ? action.data : x
    ))
  default:
    return state
  }
}

export const createPromotion = (params) => async (dispatch) => {
  try {
    const promotion = await promotionsService.create(params)
    dispatch({
      type: 'CREATE_PROMOTION',
      data: promotion,
    })
    dispatch(changeNotification('Succesfully created a new promotion!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to create new promotion.', 5))
  }
}

export const toggleActivePromotion = (promotion) => async (dispatch) => {
  try {
    const updatedClass = await promotionsService.update(
      promotion.id,
      { ...promotion, active: !promotion.active },
    )
    dispatch({
      type: 'UPDATE_PROMOTION',
      data: updatedClass,
    })
    dispatch(changeNotification('Succesfully updated a new promotion!', 5))
  } catch (e) {
    dispatch(changeNotification('Error: Failed to update new promotion.', 5))
  }
}

export const initializePromotions = () => async (dispatch) => {
  try {
    const promotion = await promotionsService.getAll()
    dispatch({
      type: 'INIT_PROMOTIONS',
      data: promotion,
    })
  } catch (e) {
    console.log(e)
  }
}

export default PromtoionsReducer
