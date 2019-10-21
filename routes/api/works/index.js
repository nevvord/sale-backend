function getWorks(req, res) {
    db.Works.find().lean().exec((err, works) => {
        if (err) {
            res
                .status(500)
                .send({
                    msg: "Не получилось найтиработы",
                    err
                })
        }
        res.send(works)
    })
}

function postWork(req, res) {
    const  body = {
        name: req.body.name,
        description: req.body.description,
        technology: req.body.technology.split(','),
        projects: req.body.projects.split(','),
        inner: req.body.inner,
        file: req.file.filename
    }

    db.Works.create(body, (err, resultat) => {
        if (err) return res.status(500).send({err})
        res.send({resultat})
    })
}

module.exports = { getWorks, postWork}