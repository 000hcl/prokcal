import api from "./common"
const baseUrl = '/goals'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

const create = async (newGoal) => {
  const response = await api.post(baseUrl, newGoal)

  return response.data
}

export default { getAll, create }