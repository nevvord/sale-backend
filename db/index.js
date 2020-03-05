const   mongoose        =   require('mongoose')
//===== Config =====
const   { dbConfig }    =   require('config')
//===== DB =====
const   connection      =   mongoose.createConnection(`mongodb://${dbConfig.host}/${dbConfig.name}`, {useNewUrlParser: true, useUnifiedTopology: true})

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
        Users : require('./models/users')(mongoose, connection),
        CreateStores : require('./models/createStores')(mongoose, connection),
        UpWorks : require('./models/upWorks')(mongoose, connection),
        Admins: require('./models/Admin')(mongoose, connection)
    }
}