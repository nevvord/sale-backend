const { ip } = require('config')

module.exports = (req, res, next) => {
    let auth = false
    ip.forEach(element => element === req.connection.remoteAddress ? auth = true : auth = false)
    auth === true ? next() : res.status(403).send({msg: "Ваш IP отсутствует в допуске."})
}