module.exports = (req, res) => {
    const body = {
        ...req.body,
        author: req.userID
    }

    db.UpWorks.create(body, (error, resultat) => {
        if (error)  return res.status(500).send({msg: "ERROR(8): Не-удалось добавить", error})
        
        res.send({
            msg: "Работа добавлена успешно",
            resultat
        }) 
    })
}