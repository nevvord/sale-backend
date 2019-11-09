module.exports = function get( req, res ) {
    db.Inner.find().exec(( error, resultat ) => {
        if ( error ) {
            return res.status(500).send({
                    msg: "Не удалось найти файлы",
                    error
                })
        }
        if( !resultat[0] ){
            db.Inner.create({inner: '<p>New content. Eeeeee booooy</p>'}, ( err, result ) => {
                if (err) {
                    return res.status(500).send({
                        msg: "Ошибка при создании нового иннера",
                        err
                    })
                }
                return res.send( [ result ] )
            })
        }else{
            return res.send( resultat )
        }
    })
}

