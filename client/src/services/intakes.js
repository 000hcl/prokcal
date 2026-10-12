import api from "./common"
const baseUrl = '/intakes'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

const create = async (newIntake) => {
  const response = await api.post(baseUrl, newIntake)

  return response.data
}

export default { getAll, create }