import loginService from '../services/loginService'
import logoutService from '../services/logoutService'
import { changeNotification } from './notificationReducer'

// eslint-disable-next-line default-param-last
const adminReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN_ADMIN':
    return action.data
  case 'LOGOUT_ADMIN':
    return null
  default:
    return state
  }
}

export const loginAdmin = (loginInfo) => async (dispatch) => {
  try {
    const user = await loginService.login(loginInfo)
    window.localStorage.setItem('loggedFlightappAdmin', JSON.stringify(user))
    loginService.setToken(user.token)
    dispatch({
      type: 'LOGIN_ADMIN',
      data: user,
    })
    dispatch(changeNotification(`${user.username} has succesfully logged in.`, 5))
  } catch (e) {
    dispatch(changeNotification('Error: log in failed.', 5))
  }
}

export const initializeAdmin = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedFlightappAdmin')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    loginService.setToken(user.token)
    dispatch({
      type: 'LOGIN_ADMIN',
      data: user,
    })
  } else {
    dispatch({
      type: 'LOGOUT_ADMIN',
    })
  }
}

export const logoutAdmin = () => async (dispatch) => {
  try {
    await logoutService.logout()
    window.localStorage.clear()
    loginService.setToken(null)
    dispatch({
      type: 'LOGOUT_ADMIN',
    })
    dispatch(changeNotification('You have succesfully logged out.', 5))
  } catch (excpetion) {
    dispatch(changeNotification('Error: log out failed.', 5))
  }
}

export default adminReducer
