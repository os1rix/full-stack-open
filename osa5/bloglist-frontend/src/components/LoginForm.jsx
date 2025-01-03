import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const LoginForm = ({ setUser, setErrorMessage, setSuccessMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = {
        loggedUsername: username,
        loggedPassword: password,
      }
      const user = await loginService.login(loggedUser)
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername("")
      setPassword("")
      setSuccessMessage("Logged in!")
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      console.error("Wrong credentials!")
      setErrorMessage("Wrong credentials!")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
}

export default LoginForm
