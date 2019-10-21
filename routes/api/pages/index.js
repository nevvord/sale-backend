function getPage(req, res) {
    db.Pages.find().lean().exec((err, pages) => {
        if (err) {
            res
                .status(500)
                .send({
                    msg: "Не получилось найти страницы",
                    err
                })
        }
        res.send(pages)
    })
}

function postPage(req, res) {
    const  body = {
        name: req.body.name,
        inner: req.body.inner,
        display: req.body.display
    }

    db.Pages.create(body, (err, resultat) => {
        if (err) return res.status(500).send({err})
        res.send({resultat})
    })
}

module.exports = { getPage, postPage }