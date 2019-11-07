function getTechnologies(req, res) {
    db.Technologies.find().lean().exec((err, technologies) => {
        if (err) {
            return res.status(500).send({
                    msg: "Не получилось найти технологии",
                    err
                })
        }
        res.send(technologies)
    })
}

function postTechnology(req, res) {
    const  body = {
        name: req.body.name,
        link: req.body.link,
        file: req.file.filename
    }

    db.Technologies.create(body, (err, resultat) => {
        if (err) return res.status(500).send({err})
        
        res.send({
            msg: "Технология добавленна успешно",
            resultat
        })
    })
}

module.exports = { getTechnologies, postTechnology}