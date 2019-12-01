const bcryptjs = require('bcryptjs')
module.exports = (req, res) => {
    bcryptjs.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send({msg: 'Salt error.',err: err})
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.status(500).send({msg: 'Hash error.',err: err})
            db.Users.create({...req.body, password: hash}, (error, resultat) => {
                if (error)  return res.status(500).send({error})
                res.send({ msg: "Registration success.", resultat })
            })
        })
    })
    
}