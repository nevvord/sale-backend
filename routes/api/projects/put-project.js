const fs = require('fs')

function putProject(req, res) {
    console.log(req.file);
    
    let body = {}
    if (req.file) {
        body = {
            name: req.body.name,
            link: req.body.link,
            description: req.body.description,
            file: req.file.filename
        }
    }else{
        body = {
            name: req.body.name,
            link: req.body.link,
            description: req.body.description
        }
    }

    db.Projects.updateOne({ _id: req.params.id }, { ...body }, (error) => {
        if (error) {
            return res
                .status(500)
                .send({
                    msg: "Ошибка сервера. Неудалось внести изменения в проект."
                })
        }        
        if(req.file){
            fs.unlink('./uploads/' + req.body.file, err => {
                console.log(req.body.file)
                if (err) {
                    return res
                            .send({
                                msg: "Неудалось удалить файл при изменении проекта.",
                                newFile: req.file.filename
                            })
                }
                return res.send({
                    msg: "Проект изменен успешно.",
                    newFile: req.file.filename
                })
                
            })
        }else{
            res.send({
                msg: "Проект изменен успешно."
            })
        }
    })
}

module.exports = putProject