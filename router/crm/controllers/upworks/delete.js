module.exports = (req, res) => {
    db.UpWorks.deleteOne({_id: req.params.id}, (error, resultat) => {
        if (error) return res.status(500).send({ msg: "ERROR(3): Ошибка сервера. Не-удалось удалить работы." })
        res.send({msg: "Удаление успешно", resultat})
    })
}