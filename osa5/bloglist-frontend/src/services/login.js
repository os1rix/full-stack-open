import axios from "axios"
const baseURL = "/api/login"

const login = async (userInformation) => {
  const request = await axios.post(baseURL, userInformation)
  console.log(request)
  return request.data
}

export default { login }
