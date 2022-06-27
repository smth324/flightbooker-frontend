import { token, apiClient } from './loginService'

const url = '/api/places'

const create = async (params) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.post(url, params, config)
  return response.data
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.get(url, config)
  return response.data
}

const update = async (id, updatedPlace) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.put(`${url}/activity/${id}`, updatedPlace, config)
  return response.data
}

const functions = { create, getAll, update }
export default functions
