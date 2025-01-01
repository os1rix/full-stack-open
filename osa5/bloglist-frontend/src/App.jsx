import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import Message from "./components/Message"
import Togglable from "./components/Togglable"
import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const blogFormRef = useRef()

  const handleSubmit = (event) => {
    try {
      event.preventDefault()
      const newBlog = {
        title: title,
        author: author,
        user: user.name,
        url: url,
        likes: 0,
      }
      blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setTitle("")
      setAuthor("")
      setUrl("")
      setSuccessMessage(`New blog "${newBlog.title}" posted succesfully!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage("Error in posting the blog!")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
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
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm handleSubmit={handleSubmit} />
      </Togglable>
      <br />
      <div>
        {blogs.map((blog) => (
          <p>
            {blog.title}
            <Togglable buttonLabel="view">
              <Blog key={blog.id} blog={blog} />
            </Togglable>
          </p>
        ))}
      </div>
    </>
  )
}

export default App
