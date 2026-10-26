import api from "./common"
const baseUrl = '/users'

const register = async (credentials) => {
  const response = await api.post(baseUrl, credentials)
  return response.data
}

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

export default { register, getAll }