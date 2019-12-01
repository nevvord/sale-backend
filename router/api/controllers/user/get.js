module.exports = (req, res) => {
    db.Users.find().exec((error, users) => {
        error ? res.status(500).send({ msg: "Не удалось найти страницы", err }) : res.send({status: 'Success', users})
    })
} 