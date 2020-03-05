module.exports = (req, res) => {
    db.UpWorks.find().exec((error, resultat) => {
        if (error) return res.status(500).send({ msg: "ERROR(upworks>get>3)", error })
        res.send(resultat)
    })
}