const bcryptjs = require('bcryptjs')
module.exports = (req, res) => {

    bcryptjs.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send({msg: 'Salt error.',err: err})
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.status(500).send({msg: 'Hash error.',err: err})
            db.CreateStores.create({...req.body, password: hash, mainID: req.userID}, (error, resultat) => {
                if (error)  return res.status(500).send({error})
                res.send({ msg: "Your registration has been added to the processing, expect a response to the e-mail.", resultat })
            })
        })
    })
    
}