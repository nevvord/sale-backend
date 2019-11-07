function putPage(req, res) {
    
    let body = {
        name: req.body.name,
        inner: req.body.inner,
        display: req.body.display
    }
    db.Pages.updateOne({ _id: req.params.id }, { ...body }, error => {
        if (error) {
            console.log(error);
            
            return res
                .status(500)
                .send({
                    msg: "Ошибка сервера. Неудалось внести изменения в страницу."
                })
        }        
        res.send({
            msg: "Страница изменена успешно."
        })
    })
}

module.exports = putPage