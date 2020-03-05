module.exports = (req, res) => {

    db.CreateStores.find({mainID: req.userID}, (error, stores) => {
        if (error) return res.status(500).send({error})
        if ( stores[0] === undefined) return res.status(404)
        console.log(stores[0]);
        res.send({
            msg: "Stores find",
            stores
        })
    })
}
