import api from "./common"
const baseUrl = '/presets'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

const create = async (newPreset) => {
  const response = await api.post(baseUrl, newPreset)
  
  return response.data
}

export default { getAll, create }