const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const { privatKey, mail } = require('config')

module.exports = (req, res, next) => {
        const token = req.body.token
        
    if (!req.cookies.refresh){
        return res.status(403).send({
            msg: "Автарезируйтесь для работы с сервером. Ваш рефреш токен отсутствует."
        })
    }
    
    next()
}