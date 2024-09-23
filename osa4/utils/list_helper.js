const _ = require("lodash")

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length !== 0
    ? blogs.reduce((favorite, blog) =>
        blog.likes > favorite.likes ? blog : favorite
      )
    : null
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, (blog) => blog.author)
  if (blogs.length !== 0) {
    return {
      author: _.maxBy(_.toPairs(authors), (blog) => blog[1])[0],
      blogs: _.maxBy(_.toPairs(authors), (blog) => blog[1])[1],
    }
  } else return null
}

const mostLikes = (blogs) => {
  const likesByAuthor = _(blogs)
    .groupBy("author")
    .map((blogs, author) => ({
      author: author,
      likes: _.sumBy(blogs, "likes"),
    }))
    .value()

  return _.isEmpty(likesByAuthor) ? null : _.maxBy(likesByAuthor, "likes")
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
