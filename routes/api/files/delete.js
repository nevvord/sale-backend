const fs = require('fs')

module.exports = function deleteFile(req, res){
    db.Files.deleteOne({ _id: req.params.id }, error => {
        if (error) {
            return res.status(404).send({
                    msg: "Ошибка сервера при удалении файла. Возможно файл не существует в базе данных.",
                    error
                })
        }
        
        fs.unlink(`./uploads/${req.body.file}`, err => {
            if (err){
                return res.send({
                        msg: "Ошибка сервера. Не удалось удалить файл. Обратитесь в тех потдержку т.к. это може привести к заполнению сервера.",
                        err
                    })
            }
            res.send({
                msg: "Файл удален успешно."
            })
        })
    })    
}