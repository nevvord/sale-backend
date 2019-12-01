module.exports = (req, res) => {
    const  body = {
        name: req.body.name,
        inner: req.body.inner,
        display: req.body.display,
        position: req.body.position
    }

    db.Pages.create(body, (err, resultat) => {
        if (err) return res.status(500).send({err})
        
        res.send({
            msg: "Страница добавленна успешно",
            resultat
        })
    })
}