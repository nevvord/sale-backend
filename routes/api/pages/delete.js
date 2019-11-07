function deletePage(req, res){
    db.Pages.deleteOne({ _id: req.params.id }, (error) => {
        if (error) {
            return res
                .status(404)
                .send({
                    msg: "Ошибка сервера при удалении страницы. Возможно страница не существует.",
                    error
                })
        }
        res.send({
            msg: "Страница удаленна успешно."
        })
    })    
}

module.exports = deletePage