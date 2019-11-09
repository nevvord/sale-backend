const fs = require('fs')

module.exports = function deleteFile(req, res){
    db.Carousel.deleteOne({ _id: req.params.id }, error => {
        if (error) {
            return res.status(404).send({
                    msg: "Ошибка сервера при удалении карусели. Елемент не найден",
                    error
                })
        }
        
        fs.unlink(`./uploads/${req.body.file}`, err => {
            if (err){
                return res.status(500).send({
                    msg: "Ошибка сервера. Не удалось удалить файл. Обратитесь в тех потдержку т.к. это може привести к заполнению сервера.",
                    err
                })
            }
            res.send({
                msg: "Элемент карусели удален успешно."
            })
        })
    })    
}