const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  const saved = await blog.save()
  response.status(201).json(saved)
})

blogsRouter.delete("/:id", async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    return response.status(404).json({ error: "Blog not found" })
  }
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const updateBlog = request.body
  const responseBody = await Blog.findByIdAndUpdate(
    request.params.id,
    updateBlog,
    { new: true }
  )
  response.json(responseBody)
})

module.exports = blogsRouter
