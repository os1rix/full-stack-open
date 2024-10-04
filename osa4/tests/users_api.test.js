const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")

const exampleUsers = [
  {
    username: "osq",
    name: "Oskari Silvoniemi",
    password: "1234567890",
  },
  {
    username: "matti",
    name: "Matti Meikäläinen",
    password: "mattopeitto",
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const hashedPasswords = await Promise.all(
    exampleUsers.map((user) => bcrypt.hash(user.password, saltRounds))
  )
  const users = exampleUsers.map((user, index) => {
    return {
      username: user.username,
      name: user.name,
      passwordHash: hashedPasswords[index],
    }
  })
  await User.insertMany(users)
})

describe("GET-request", () => {
  test("users are returned as JSON", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })
  test("GET returns correct amount of users", async () => {
    const response = await api.get("/api/users")
    assert.strictEqual(response.body.length, 2)
  })
  test('GET has attribute "id"', async () => {
    const response = await api.get("/api/users")
    response.body.forEach((user) => {
      assert(Object.keys(user).includes("id"))
    })
  })
})

describe("POST-request", () => {
  test("POST works correctly", async () => {
    const testUser = {
      username: "venla",
      name: "Venla Hämäläinen",
      password: "3939JFK3fef!",
    }

    await api
      .post("/api/users")
      .send(testUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/users")
    const allTitles = response.body.map((user) => user.username)

    assert.strictEqual(response.body.length, exampleUsers.length + 1)
    assert(allTitles.includes(testUser.title))
  })
  test("Error and 400 when no username given", async () => {
    const testUser = {
      name: "Venla Hämäläinen",
      password: "3939JFK3fef!",
    }

    const response = await api.post("/api/users").send(testUser).expect(400)

    assert.strictEqual(response.body.error.message, "Username is required")
    const GETresponse = await api.get("/api/users")
    assert.strictEqual(GETresponse.body.length, exampleUsers.length)
  })
  test("Error and 400 when no password", async () => {
    const testUser = {
      username: "venla",
      name: "Venla Hämäläinen",
    }

    const response = await api.post("/api/users").send(testUser).expect(400)

    assert.strictEqual(response.body.error.message, "Password is required")
    const GETresponse = await api.get("/api/users")
    assert.strictEqual(GETresponse.body.length, exampleUsers.length)
  })
  test("Error and 400 when no name given", async () => {
    const testUser = {
      username: "venla",
      password: "3939JFK3fef!",
    }

    const response = await api.post("/api/users").send(testUser).expect(400)

    assert.strictEqual(response.body.error.message, "Name is required")
    const GETresponse = await api.get("/api/users")
    assert.strictEqual(GETresponse.body.length, exampleUsers.length)
  })
})

after(() => {
  mongoose.connection.close()
})
