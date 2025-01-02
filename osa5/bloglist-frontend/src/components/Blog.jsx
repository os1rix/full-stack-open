import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const likeBlog = async () => {
    try {
      const newBlog = {
        user: blog.user.id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }
      await blogService.update(blog.id, newBlog)
      setLikes(newBlog.likes)
    } catch (exception) {
      console.error("Error in liking the blog")
    }
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      try {
        await blogService.Delete(blog.id)
      } catch (exception) {
        console.error("Error in removing the blog")
      }
  }

  if (visible) {
    return (
      <div>
        <p>
          {`${blog.title} `}
          {blog.author}
          <button onClick={() => setVisible(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {likes}
          <button onClick={() => likeBlog()}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <p>
          <button onClick={() => removeBlog()}>remove</button>
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <p>
          {`${blog.title} `}
          {blog.author}
          <button onClick={() => setVisible(true)}>show</button>
        </p>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
