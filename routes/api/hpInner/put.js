module.exports = function putPage(req, res) {
    let body = {
        inner: req.body.inner
    }
    console.log(req.params.id);
    
    db.Inner.updateOne({ _id: req.params.id }, { ...body }, error => {
        if (error) {
            return res.status(500).send({
                msg: "Ошибка сервера. Неудалось внести изменения в Inner."
            })
        }        
        return res.send({
            msg: "Inner изменен успешно."
        })
    })
}