const jwt = require('jsonwebtoken') 
const { privatKey } = require('config')

function logout (req, res) {
    res
        .cookie('refresh', null, {
        httpOnly: true,
        maxAge: 1
        })
        .send({
            logout: "success"
        })
    
}

module.exports = logout
