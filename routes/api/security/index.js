const { ip } = require('config')

module.exports = (req, res, next) => {
    let auth = false
    ip.forEach(element => {
        if(element === req.connection.remoteAddress){
            auth = true
        }
    })

    if(auth){
        next()
    }else{
        res.status(403).send({
            msg: "Ваш IP отсутствует в допуске."
        })
    }
    
    
}