const fs = require('fs')

module.exports = function putWork(req, res) {
    let body = {
        name: req.body.name,
        description: req.body.description,
        projects: [],
        technology: []
    }
    
    if(req.body.projects !== ''){
        body = {
            ...body,
            projects: req.body.projects.split(','),
        }
    }
    
    if(req.body.technology !== ''){
        body = {
            ...body,
            technology: req.body.technology.split(',')
        }
    }
    
    if (req.file) {
        body = {
            ...body,
            file: req.file.filename
        }
    }

    db.Works.updateOne({ _id: req.params.id }, { ...body }, error => {
        if (error) {
            return res
                .status(500)
                .send({
                    msg: "Ошибка сервера. Неудалось внести изменения в работу.",
                    error
                })
        }        
        if(req.file){
            fs.unlink('./uploads/' + req.body.file, err => {
                if (err) {
                    return res
                            .send({
                                msg: "Неудалось удалить файл при изменении работы.",
                                newFile: req.file.filename,
                                err
                            })
                }
                return res.send({
                    msg: "Работа измененна успешно.",
                    newFile: req.file.filename
                })
                
            })
        }else{
            res.send({
                msg: "Работа измененна успешно."
            })
        }
    })
}