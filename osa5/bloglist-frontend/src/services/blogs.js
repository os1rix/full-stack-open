import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blog) => {
  const auth = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, auth)
  return response.data
}

const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const Delete = async (id) => {
  const auth = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, auth)
  return response.data
}

export default { getAll, setToken, create, update, Delete }
