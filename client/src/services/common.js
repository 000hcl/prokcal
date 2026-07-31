import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

let token = null

export const setToken = (newToken) => {
  token = newToken
}

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})

export default api