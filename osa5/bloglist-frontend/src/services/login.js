import axios from "axios"
const baseURL = "/api/login"

const login = async (userInformation) => {
  const request = axios.post(baseURL, userInformation)
  return request.data
}

export default { login }
