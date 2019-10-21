function getSpecializations(req, res) {
    db.Specializations.find().lean().exec((err, specializations) => {
        if (err) {
            res
                .status(500)
                .send({
                    msg: "Не получилось найти специализации",
                    err
                })
        }
        res.send(specializations)
    })
}

function postSpecialization(req, res) {
    const  body = {
        name: req.body.name,
        description: req.body.description,
        technology: req.body.technology.split(','),
        projects: req.body.projects.split(','),
        inner: req.body.inner,
        file: req.file.filename
    }

    db.Specializations.create(body, (err, resultat) => {
        if (err) return res.status(500).send({err})
        res.send({resultat})
    })
}

module.exports = { getSpecializations, postSpecialization }