const   mongoose        =   require('mongoose')
//===== Config =====
const   { dbConfig }    =   require('config')
//===== DB =====
const   connection      =   mongoose.createConnection(`mongodb://${dbConfig.host}/${dbConfig.name}`, {useNewUrlParser: true})

//===== Connections =====
connection.on('connected',      ()      => { console.log(`Mongoose conected to ${dbConfig.name} db`)})
connection.on('error',          (err)   => { console.log(`Mongoose not conected to ${dbConfig.name} db: `, err)})
connection.on('disconnected',   ()      => { console.log(`Mongoose disconected with ${dbConfig.name} db`)})

//===== Module exports =====
module.exports = () => {
    console.log(`Returning db...`)
    //===== Return models =====
    return{
        connection,
        Works : require('./models/works')(mongoose, connection),
        Technologies : require('./models/technologies')(mongoose, connection),
        Projects : require('./models/projects')(mongoose, connection),
        Specializations : require('./models/specializations')(mongoose, connection),
        Pages : require('./models/pages')(mongoose, connection),
        Files : require('./models/files')(mongoose, connection),
    }
}