function getFiles(req, res) {
    db.Files.find().exec((err, files) => {
        if (err) {
            return res.status(500).send({
                    msg: "Не удалось найти файлы",
                    err
                })
        }
        res.send(files)
    })
}

function postFile(req, res) {
    const  body = {
        file: req.file.filename
    }
    db.Files.create(body, (err, resultat) => {
        if (err) return res.status(500).send({
            msg: "Неудалось добавить файл",
            err
        })
        
        res.send({
            msg: "Файл добавлен успешно",
            resultat
        })
    })
}

module.exports = { getFiles, postFile }