const jwt = require('jsonwebtoken')
const { privatKey } = require('../config/default')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({msg: 'Token required.'})
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') return res.status(401).send({msg: 'Login to view.'})
    let payload = jwt.verify(token, privatKey)
    if (!payload) return res.status(401).send({msg: 'Invalid token.'})
    req.userID = payload._id
    let user = db.Users.findOne({email: payload.email})
    if (!user) return res.status(401).send({msg: 'The user is not a verified user or affiliate.'})
    next()
}