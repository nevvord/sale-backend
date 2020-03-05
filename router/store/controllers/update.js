module.exports = (req, res) => {
    db.CreateStores.updateOne({ _id: req.params.id }, { $set: { ...req.body } }, (error, resultat) => {
        if (error) return res.status(500).send({ msg: "ERROR(3): Ошибка сервера. Неудалось внести изменения." })
        res.send({ msg: "Изменения успешны.", resultat})
    })
}