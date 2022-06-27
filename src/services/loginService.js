import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})
const baseUrl = '/api/logins'

// eslint-disable-next-line import/no-mutable-exports
export let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const login = async (credentials) => {
  const response = await apiClient.post(baseUrl, credentials)
  return response.data
}

const functions = { login, setToken }
export default functions
