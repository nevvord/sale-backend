module.exports = (req, res) => {

    db.CreateStores.find({},(error, stores) => {
        if (error) return res.status(500).send({error})
        res.send({
            msg: "Stores find",
            stores
        })
    })
}
