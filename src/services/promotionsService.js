import { token, apiClient } from './loginService'

const url = '/api/promotions'

const create = async (params) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.post(url, params, config)
  return response.data
}

const check = async (params) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.post(`${url}/check`, params, config)
  return response.data
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.get(url, config)
  return response.data
}

const update = async (id, updatedPromo) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.put(`${url}/activity/${id}`, updatedPromo, config)
  return response.data
}

const functions = {
  create, getAll, update, check,
}
export default functions
