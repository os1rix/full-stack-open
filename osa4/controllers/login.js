const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (request, response) => {
  const { loggedUsername, loggedPassword } = request.body
  const userLogged = await User.findOne({ username: loggedUsername })
  const isCorrectPassword =
    userLogged === null
      ? false
      : await bcrypt.compare(loggedPassword, userLogged.passwordHash)

  if (!(userLogged && isCorrectPassword)) {
    return response.status(401).json({
      error: "invalid username or password",
    })
  }

  const userForToken = {
    username: userLogged.username,
    id: userLogged._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: userLogged.username, name: userLogged.name })
})

module.exports = loginRouter
