module.exports = function putPagePosition (req, res) {
    db.Pages.updateOne({ _id: req.params.id }, { position: req.body.position }, (error, resultat) => {
        if (error) return res.status(500).send({
            msg: "Не удалось изменить позицию"
        })
        res.send({
            msg: `Позиция измененна на ${req.body.position}`
        })
    })
}