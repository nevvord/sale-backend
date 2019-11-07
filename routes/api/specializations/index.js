function getSpecializations(req, res) {
    db.Specializations.find().lean().exec((err, specializations) => {
        if (err) {
            return res.status(500).send({
                    msg: "Не получилось найти специализации",
                    err
                })
        }
        res.send(specializations)
    })
}

function postSpecialization(req, res) {
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

    db.Specializations.create(body, (err, resultat) => {
        if (err) return res.status(500).send({
            msg: "Неудалось создать специализацию",
            err
        })
        res.send({
            msg: "Специализация созданна успешно",
            resultat
        })
    })
}

module.exports = { getSpecializations, postSpecialization }