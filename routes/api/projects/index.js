function getProjects(req, res) {
    db.Projects.find().lean().exec((err, projects) => {
        if (err) {
            res
                .status(500)
                .send({
                    msg: "Не получилось найти технологии",
                    err
                })
        }
        res.send(projects)
    })
}

function postProject(req, res) {
    const  body = {
        name: req.body.name,
        description: req.body.description,
        inner: req.body.inner,
        link: req.body.link,
        file: req.file.filename
    }

    db.Projects.create(body, (err, resultat) => {
        if (err) return res.status(500).send({
            msg: "Ошибка сервера. Неудалось добавить новый преокт."
        })
        res.send({
            msg: "Проект успешно добавлен",
            resultat
        })
    })
}

module.exports = { getProjects, postProject}