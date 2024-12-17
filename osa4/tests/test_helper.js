const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const initialUsersGenerator = async () => {
  const exampleUsers = [
    {
      username: "osqu",
      name: "Oskari Salvoniemi",
      password: "1234567890000",
    },
    {
      username: "motti",
      name: "Motti Meikäläinen",
      password: "peittomatto",
    },
  ]
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

  return users
}

const getTokenFor = (user) => {
  if (!user) {
    throw new Error("User not found")
  }
  return jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
}

module.exports = {
  initialUsersGenerator,
  getTokenFor,
}
