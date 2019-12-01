const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const { privatKey } = require('config')

module.exports = (req, res) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password.toString()

  db.Users.findOne({email}).exec((error, user) => {
    if (error) return res.status(500).send({msg: "Server ERROR: Status 500.10, DB ERROR!"})
    if (!user) return res.status(404).send({msg: "User not found"})
    if (user && email !== user.email) return res.status(400).send({msg: "Invalid email."})
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) return res.status(500).send({ msg: "Server ERROR: 500.15, CRIPT ERROR", err })
      if (!passwordMatch) return res.status(401).send("Invalid password.")
      const refreshToken = uuid()
      const bodyToken = {
        email: user.email,
        _id: user._id
      }
      jwt.sign(bodyToken, privatKey, (err, token) => {
        if (err) return res.status(500).send({ msg: "Server ERROR: 500.22, JWT ERROR", err }) 
        res .cookie('refresh', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 3 })
            .status(200)
            .send({ msg: "Login successful", token })
      })
    })
  })
}
