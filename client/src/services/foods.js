import axios from 'axios'
const baseUrl = '/api/foods'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newFood) => {
  const response = await axios.post(baseUrl, newFood)

  return response.data
}

export default { getAll, create }