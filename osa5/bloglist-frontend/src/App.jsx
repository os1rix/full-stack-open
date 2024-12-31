import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import Message from "./components/Message"
import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser")
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      console.error("No user found!")
    }
  }, [])

  if (!user) {
    return (
      <div>
        <Message errorMessage={errorMessage} successMessage={successMessage} />
        <LoginForm
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      </div>
    )
  }

  return (
    <>
      <Message errorMessage={errorMessage} successMessage={successMessage} />
      <div>
        <h1>Blogs</h1>
        <p>
          {`${user.name} logged in`}
          <button onClick={logOut}>logout</button>
        </p>
      </div>
      <BlogForm
        user={user}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default App
