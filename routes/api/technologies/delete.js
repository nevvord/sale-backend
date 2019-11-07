const fs = require('fs')

function deleteTecnology(req, res){
    db.Technologies.deleteOne({ _id: req.params.id }, error => {
        if (error) {
            return res
                .status(404)
                .send({
                    msg: "Ошибка сервера при удалении технологии. Возможно технология не существует.",
                    error
                })
        }
        fs.unlink('./uploads/' + req.body.file, err => {
            if (err){
                return res
                    .status(500)
                    .send({
                        msg: "Ошибка сервера. Неполучилось удалить файл. Обратитесь в тех потдержку т.к. это може привести к заполнению сервера."
                    })
            }
            db.Specializations.find({technology: { "$all" : [req.params.id]}}, (er, docs) => {
                if (er) {
                    return res.status(500).send({
                        msg: "Ошибка очистки специализации от технологии. Поиск технологий в специализации привел к ошибке."
                    })
                }
                docs.forEach(element => {
                    element.technology = element.technology.filter(tech => {
                        return tech !== req.params.id
                    })
                    db.Specializations.updateOne({_id: element._id}, {technology: element.technology}, errorr => {
                        if (errorr) {
                            return res.status(500).send({
                                msg: "Ошибка очистки специализации от технологии. Апдейт технологий в специализации привел к ошибке."
                            })
                        }
                    })
                })
            })
            db.Works.find({technology: { "$all" : [req.params.id]}}, (er, docs) => {
                if (er) {
                    return res.status(500).send({
                        msg: "Ошибка очистки работы от технологии. Поиск технологий в работах привел к ошибке."
                    })
                }
                docs.forEach(element => {
                    element.technology = element.technology.filter(tech => {
                        return tech !== req.params.id
                    })
                    db.Works.updateOne({_id: element._id}, {technology: element.technology}, errorr => {
                        if (errorr) {
                            return res.status(500).send({
                                msg: "Ошибка очистки работы от технологии. Апдейт технологий в работах привел к ошибке."
                            })
                        }
                    })
                })
            })
            res.send({
                msg: "Технология удаленна успешно"
            })
        })
    })    
}

module.exports = deleteTecnology