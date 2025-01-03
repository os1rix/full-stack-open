import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog, likeHandler, setSuccessMessage, user, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  console.log(blog)

  const likeBlog = async () => {
    likeHandler()
    try {
      const newBlog = {
        user: blog.user,
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
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id))
        setSuccessMessage("Blog removed successfully!")
      } catch (exception) {
        console.log(exception)
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
        <p>{blog.user.username}</p>
        {user.username === blog.user.username && (
          <p>
            <button onClick={() => removeBlog()}>remove</button>
          </p>
        )}
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
  likeHandler: PropTypes.func.isRequired,
}

export default Blog
