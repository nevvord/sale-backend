const fs = require('fs')

function deleteSpecialization(req, res){
    db.Specializations.deleteOne({ _id: req.params.id }, error => {
        
        if (error) {
            return res
                .status(404)
                .send({
                    msg: "Ошибка сервера при удалении специализации. Возможно специализация не существует.",
                    error
                })
        }
        
        fs.unlink('./uploads/' + req.body.file, err => {
            if (err){
                return res
                    .send({
                        msg: "Ошибка сервера. Неполучилось удалить файл. Обратитесь в тех потдержку т.к. это може привести к заполнению сервера.",
                        err
                    })
            }
            res.send({
                msg: "Специализация удаленна успешно."
            })
        })
    })    
}

module.exports = deleteSpecialization