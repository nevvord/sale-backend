const fs = require('fs')

function clearWithTechnology(id) {
    db.Technologies.find({_id: id}, (err, docs) => {
        docs.forEach(element => {
                
        })
    })
}

function deleteTecnology(req, res){
    db.Technologies.deleteOne({ _id: req.params.id }, (error, resultat) => {
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
                console.log(err)
                return res
                    .status(500)
                    .send({
                        msg: "Ошибка сервера. Неполучилось удалить файл. Обратитесь в тех потдержку т.к. это може привести к заполнению сервера."
                    })
            }
            res.send({
                msg: "Технология удаленна успешно"
            })
        })
    })    
}

module.exports = deleteTecnology