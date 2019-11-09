const fs = require('fs')

module.exports = (req, res) => {
    let body = {
        name: req.body.name,
        inner: req.body.inner
    }
    if (req.file) {
        body = {
            ...body,
            file: req.file.filename
        }
    }
    db.Carousel.updateOne({ _id: req.params.id }, { ...body }, error => {
        if (error) {
            return res.status(500).send({
                msg: "Ошибка сервера. Неудалось внести изменения в специализацию.",
                error
            })
        }        
        if(req.file){
            fs.unlink('./uploads/' + req.body.oldFile, err => {
                if (err) {
                    return res.send({
                                msg: "Неудалось удалить файл при изменении специализации.",
                                newFile: req.file.filename,
                                err
                            })
                }
                return res.send({
                    msg: "Специализация измененна успешно.",
                    newFile: req.file.filename
                })
                
            })
        }else{
            res.send({
                msg: "Специализация измененна успешно."
            })
        }
    })
}