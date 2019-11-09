module.exports = function post(req, res) {
    const  body = {
        file: req.file.filename,
        name: req.body.name,
        inner: req.body.inner
    }
    db.Carousel.create(body, (err, resultat) => {
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