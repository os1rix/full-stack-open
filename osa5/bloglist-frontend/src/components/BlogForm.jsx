import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ user, setSuccessMessage, setErrorMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

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
      setTitle("")
      setAuthor("")
      setUrl("")
      setSuccessMessage(`New blog "${newBlog.title}" posted succesfully!`)
    } catch (exception) {
      setErrorMessage("Error in posting the blog!")
    }
  }

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
