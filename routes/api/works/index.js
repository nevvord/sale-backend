function getWorks(req, res) {
    db.Works.find().lean().exec((err, works) => {
        if (err) {
            return res.status(500).send({
                    msg: "Не получилось найти работы.",
                    err
                })
        }
        res.send(works)
    })
}

function postWork(req, res) {
    let  body = {
        name: req.body.name,
        description: req.body.description,
        technology: [],
        projects: [],
        inner: req.body.inner,
        file: req.file.filename
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

    db.Works.create(body, (err, resultat) => {
        if (err) return res.status(500).send({
            msg: "Нуедалось создать новую работу.",
            err
        })
        res.send({
            msg: "Работа созданна успешно.",
            resultat
        })
    })
}

module.exports = { getWorks, postWork}