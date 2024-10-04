const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })

  if (users) {
    response.json(users)
  } else {
    response.status(404).end()
  }
})

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body
  if (!password) {
    throw {
      name: "ValidationError",
      message: "Password is required",
    }
  } else if (password.length < 3) {
    throw {
      name: "ValidationError",
      message: "Password must be over 2 characters long",
    }
  } else if (!username) {
    throw {
      name: "ValidationError",
      message: "Username is required",
    }
  } else if (!name) {
    throw {
      name: "ValidationError",
      message: "Name is required",
    }
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username: username,
    name: name,
    passwordHash,
  })
  const savedResult = await user.save()
  response.json(savedResult)
})

module.exports = usersRouter
