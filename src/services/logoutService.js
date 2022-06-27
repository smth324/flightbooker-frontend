import { token, apiClient } from './loginService'

const baseUrl = '/api/logouts'

const logout = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.delete(baseUrl, config)
  return response.data
}

const functions = { logout }
export default functions
