// pticin vitalik 380507498802
const fs = require('fs')

function deleteProject(req, res){
    db.Projects.deleteOne({ _id: req.params.id }, error => {
        if (error) {
            return res
                .status(404)
                .send({
                    msg: "Ошибка сервера при удалении проекта. Возможно проект не существует.",
                    error
                })
        }
        console.log(req.body);
        
        fs.unlink('./uploads/' + req.body.file, err => {
            if (err){
                console.log(err)
                return res
                    .send({
                        msg: "Ошибка сервера. Неполучилось удалить файл. Обратитесь в тех потдержку т.к. это може привести к заполнению сервера."
                    })
            }
            res.send({
                msg: "Проект удален успешно"
            })
        })
    })    
}

module.exports = deleteProject