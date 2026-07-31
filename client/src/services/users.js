import api from "./common"
const baseUrl = '/users'

const register = async (credentials) => {
  const response = await api.post(baseUrl, credentials)
  return response.data
}

export default { register }