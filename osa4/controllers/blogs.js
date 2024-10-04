const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  if (blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", async (request, response) => {
  const token = request.token
  const isCorrectToken = jwt.verify(token, process.env.SECRET)
  if (!isCorrectToken || !isCorrectToken.id) {
    response.status(401).json({ error: "token missing or invalid" })
  }
  const blogsUser = await User.findById(decodedToken.id)

  const newBlog = new Blog({ ...request.body, user: blogsUser._id })

  const saved = await newBlog.save()

  blogsUser.blogs = blogsUser.blogs.concat(result._id)
  await blogsUser.save()
  response.status(201).json(saved)
})

blogsRouter.delete("/:id", async (request, response) => {
  const toDelete = request.params.id
  const loggedUser = request.user
  const blog = await Blog.findById(request.params.id)

  if (
    loggedUser &&
    blog &&
    loggedUser._id.toString() === blog.user.toString()
  ) {
    await Blog.findByIdAndDelete(toDelete)
    response.status(204).end()
  } else if (!loggedUser) {
    response.status(401).json({ error: "Invalid token" })
  } else if (!blog) {
    response.status(404).json({ error: "Invalid ID" })
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const updateBlog = { ...request.body, user: request.user.id }
  const responseBody = await Blog.findByIdAndUpdate(
    request.params.id,
    updateBlog,
    { new: true }
  )
  response.json(responseBody)
})

module.exports = blogsRouter
