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

const edit = async (intake) => {
  const response = await api.put(`${baseUrl}/${intake.id}`, intake)
  return response.data
}

export default { getAll, create, edit }