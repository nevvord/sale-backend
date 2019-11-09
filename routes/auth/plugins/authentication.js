const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const { privatKey, mail } = require('config')

function authentication(req, res) {
  const token = req.body.token
  
  jwt.verify(token, privatKey, (err, decodeToken) => {
    if ( decodeToken && decodeToken.expires_in <= Date.now() || err && req.cookies.refresh) {
      const refreshToken = uuid()
      const bodyToken = {
        mail,
        expires_in: Date.now() + 1000 * 60 * 15
      }

      jwt.sign(bodyToken, privatKey, (err, token) => {
        if (err) {
          return res
                  .status(500)
                  .send({
                    msg: "Неудалось создать токен",
                    err
                  })
        }

        return res
                .cookie('refresh', refreshToken, {
                  httpOnly: true,
                  maxAge: 1000 * 60 * 60 * 24 * 3
                })
                .status(200)
                .send({
                  token,
                  msg: "Добро пожаловать назад Админ"
                })
      })
    }
    if( decodeToken && decodeToken.expires_in > Date.now() ){
      return res
              .status(200)
              .send({
                msg: "Добро пожаловать назад Админ"
              })
    }
    if (err) {
      return res
              .status(403)
              .send({
                msg: "Ошибка серверу неполучилось инициализировать токен",
                err
              })
    }
  })
}

module.exports = authentication