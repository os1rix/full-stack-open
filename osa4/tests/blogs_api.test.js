const mongoose = require("mongoose")
const supertest = require("supertest")
const assert = require("node:assert")
const { test, after, beforeEach, describe } = require("node:test")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blog")

const exampleBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(exampleBlogs[0])
  await blogObject.save()
  blogObject = new Blog(exampleBlogs[1])
  await blogObject.save()
})

describe("GET-request", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })
  test("GET returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, 2)
  })
  test('GET has attribute "id"', async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach((blog) => {
      assert(Object.keys(blog).includes("id"))
    })
  })
})

describe("POST-request", () => {
  test("POST works correctly", async () => {
    const testBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    }

    await api
      .post("/api/blogs")
      .send(testBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const allTitles = response.body.map((blog) => blog.title)

    assert.strictEqual(response.body.length, exampleBlogs.length + 1)
    assert(allTitles.includes(testBlog.title))
  })

  test("Value of 'likes' is 0 when not given", async () => {
    const testBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    }

    await api
      .post("/api/blogs")
      .send(testBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const allLikes = response.body.map((blog) => blog.likes)

    assert(allLikes.includes(0))
  })
  test("No URL given", async () => {
    const testBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    }

    await api.post("/api/blogs").send(testBlog).expect(400)
  })

  test("No TITLE given", async () => {
    const testBlog = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    }

    await api.post("/api/blogs").send(testBlog).expect(400)
  })
})

describe("DELETE-request", () => {
  test("DELETE gives right status and decreases the list size", async () => {
    const blogsAtStart = await api.get("/api/blogs")
    const blogToDelete = blogsAtStart.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await api.get("/api/blogs")
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)

    const ids = blogsAtEnd.body.map((blog) => blog.id)
    assert(!ids.includes(blogToDelete.id))
  })
})

describe("UPDATE-request", () => {
  test("UPDATE works", async () => {
    const blogs = await api.get("/api/blogs")
    const updateBlog = {
      ...blogs.body[0],
      likes: Math.floor(Math.random() * (1000 - 500) + 500),
    }

    await api
      .put(`/api/blogs/${updateBlog.id}`)
      .send(updateBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const blogsAfter = await api.get("/api/blogs")
    const allLikes = blogsAfter.body.map((blog) => blog.likes)
    assert(allLikes.includes(updateBlog.likes))
  })
})

after(async () => {
  await mongoose.connection.close()
})
