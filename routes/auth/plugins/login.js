const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const { privatKey, mail, password,  ip } = require('config')

function login(req, res) {
  const email = req.body.mail.toLowerCase()
  const pass = req.body.password.toString()

  let auth = false
  ip.forEach(element => element === req.connection.remoteAddress ? auth = true : auth = false)
  if (!auth) {
    return res.status(403).send({msg: "Ваш IP отсутствует в допуске."})
  }

  if (!email) {
    return res.status(400).send({msg: "Введите электронную почту"})
  }

  if (!pass) {
    return res.status(400).send({msg: "Введите пароль"})
  }

  if (email !== mail) {
    return res.status(400).send({msg: "Введенна неверная электронная почта"})
  }

  if (pass !== password) {
    return res.status(400).send({msg: "Введен неверный пароль"})
  }

  const refreshToken = uuid()
  const bodyToken = {
    mail,
    expires_in: Date.now() + 1000 * 60 * 15
  }

  jwt.sign(bodyToken, privatKey, (err, token) => {
    if (err) {
      return res.status(500).send({ msg: "Неудалось создать токен", err })
    }
    res
      .cookie('refresh', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 3 })
      .status(200)
      .send({ msg: "Авторизация успешна", token })
  })
}

module.exports = login
