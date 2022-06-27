import { token, apiClient } from './loginService'

const url = '/api/flights'

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

const search = async (params) => {
  const response = await apiClient.get(`${url}/search`, { params })
  return response.data
}

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.get(`${url}/${id}`, config)
  return response.data
}

const getOneLayout = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.get(`${url}/layout/${id}`, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await apiClient.delete(`${url}/${id}`, config)
  return response
}

const functions = {
  create, getAll, remove, getOne, getOneLayout, search,
}
export default functions
