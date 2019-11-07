function putSpecializationInner (req, res) {
    db.Specializations.updateOne({ _id: req.body._id }, { inner: req.body.inner }, (error) => {
        if (error) return res.status(500).send({
            msg: "Неудалось внести изменения в HTML проекта"
        })
        res.send({
            msg: "Html проекта изменен успешно"
        })
    })
}

module.exports = putSpecializationInner