import { token, apiClient } from './loginService'

const url = '/api/planeModels'

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

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.get(`${url}/${id}`, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.delete(`${url}/${id}`, config)
  return response
}

const update = async (id, updatedPlaneModel) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.put(`${url}/activity/${id}`, updatedPlaneModel, config)
  return response.data
}

const functions = {
  create, getAll, remove, getOne, update,
}
export default functions
