const { ip } = require('config')

module.exports = (req, res, next) => {
    let auth = false
    auth = ip.forEach(element => element === req.connection.remoteAddress)
    next()
    //auth === true ? next() : res.status(403).send({msg: "Ваш IP отсутствует в допуске."})
}