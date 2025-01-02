import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }
    handleSubmit(newBlog)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title:</label>
          <input
            htmlFor="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            htmlFor="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            htmlFor="url"
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

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default BlogForm
