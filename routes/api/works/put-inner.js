module.exports = function putWorkInner (req, res) {
    db.Works.updateOne({ _id: req.body._id }, { inner: req.body.inner }, error => {
        if (error) return res.status(500).send({
            msg: "Неудалось внести изменения в HTML работы",
            err
        })
        res.send({
            msg: "Html работы изменен успешно"
        })
    })
}