const fs = require('fs')

module.exports = function deleteWork(req, res){
    db.Works.deleteOne({ _id: req.params.id }, error => {
        
        if (error) {
            return res
                .status(404)
                .send({
                    msg: "Ошибка сервера при удалении работы. Возможно работа не существует.",
                    error
                })
        }
        
        fs.unlink('./uploads/' + req.body.file, err => {
            if (err){
                return res
                    .send({
                        msg: "Ошибка сервера. Не удалось удалить файл. Обратитесь в тех потдержку т.к. это може привести к заполнению сервера.",
                        err
                    })
            }
            res.send({
                msg: "Работа удаленна успешно."
            })
        })
    })    
}