const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { privatKey } = require('config')

module.exports = (req, res) => {  
  const login = req.body.login
  const password = req.body.password.toString()

  db.Admins.findOne({login}).exec((error, user) => {
    if (error) return res.status(500).send({msg: "Server ERROR: Status 500.10, DB ERROR!"})
    if (!user) return res.status(401).send({msg: "Упс... Неверный логин или пользователь не существует!"})
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) return res.status(500).send({ msg: "Server ERROR: 500.13, CRIPT ERROR", err })
      if (!passwordMatch) return res.status(401).send({msg: "Неверный пароль!"})
      const bodyToken = {
        email: user.email,
        _id: user._id
      }
      jwt.sign(bodyToken, privatKey, (err, token) => {
        if (err) return res.status(500).send({ msg: "Server ERROR: 500.20, JWT ERROR", err }) 
        res .status(200)
            .send({ msg: "Добро пожаловать!", token })
      })
    })
  })
}