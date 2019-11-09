module.exports = function get(req, res) {
    db.Carousel.find().exec((err, files) => {
        if (err) {
            return res.status(500).send({
                    msg: "Не удалось найти файлы",
                    err
                })
        }
        res.send(files)
    })
}

