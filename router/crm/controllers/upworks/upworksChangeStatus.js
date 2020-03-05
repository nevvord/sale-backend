module.exports =(req, res) => {
    let works = []

    db.UpWorks.findOne({_id: req.params.UpworksID}, (error, resultat) => {
        console.log("FindOne: ", resultat);
        
        if (error) return res.status(500).send({msg: "ERROR:ChangeWork.3 = Ошибка сервера. Не удалось найти Работу."})
        resultat.works.map(work => {
            if (work._id === req.params.WorkID) {
                console.log("Parametri: ", work._id, " !== ", req.params.WorkID)
                console.log("Work.10: ", work)
                console.log("Works.12: ", works);
                works.push({ ...work, status: !work.status })
                console.log("Works.14: ", works);
                
            }else{
                console.log("Work.15: ", work)
                works.push({ ...work })
            }
        })
        console.log("20: ", works);  
    })

    console.log("Works.23: ", works);
    
    // db.UpWorks.updateOne({ _id: req.params.UpworksID }, { $set: { works: works } }, (err, result) => {
    //     if (err) console.log(err);
    //     if (err) return res.status(500).send({msg: "ERROR:ChangeWork.12 = Ошибка сервера. Не удалось изменить Работу."})
    //     console.log("Works: ", works);
    //     console.log("ID: ", req.params.WorkID);
        
        
    //     res.send({ msg: "Изминение успешно" })
    // })
}