const Blog = ({ blog }) => {
  const blogStyle = {
    display: "block",
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>
        {blog.likes}
        <button>like</button>
      </p>
    </div>
  )
}

export default Blog
