import api from "./common"
const baseUrl = '/foods'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

const create = async (newFood) => {
  const response = await api.post(baseUrl, newFood)

  return response.data
}

export default { getAll, create }