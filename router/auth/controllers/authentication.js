const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const { privatKey, mail, ip } = require('config')

function authentication(req, res) {
  const token = req.body.token
  let auth = false
  ip.forEach(element => element === req.connection.remoteAddress ? auth = true : auth = false)

  if(!auth){
    return res.status(403).send({msg: "Ваш IP отсутствует в допуске."})
  }

  if (!token){
    return res.status(418).send({msg: "Тонек отсутсвует"})
  }

  jwt.verify(token, privatKey, (error, decodeToken) => {
    if (error){
      return res.status(403).send({msg: "Ошибка аторизации при проверке токена"})
    }
    
    if(decodeToken.expires_in <= Date.now()){
      const refreshToken = uuid()
      const bodyToken = {
        mail,
        expires_in: Date.now() + 1000 * 60 * 3
      }
      
      jwt.sign(bodyToken, privatKey, (err, token) => {
        if (err) { return res.status(500).send({ msg: "Неудалось создать токен", err }) }
        return res
          .cookie('refresh', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 3 })
          .status(200)
          .send({ token, msg: "Добро пожаловать назад Админ" })
      })
    }else{
      return res.status(200).send({ msg: "Добро пожаловать назад Админ" })
    }
  })
}

module.exports = authentication