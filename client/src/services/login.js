import api from "./common"
const baseUrl = '/login'

const logIn = async (credentials) => {
  const response = await api.post(baseUrl, credentials)
  return response.data
}

export default { logIn }