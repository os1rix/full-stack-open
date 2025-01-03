import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ handleSubmit, user }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      user: user,
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
            data-testid="title"
            htmlFor="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            data-testid="author"
            htmlFor="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            data-testid="url"
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
