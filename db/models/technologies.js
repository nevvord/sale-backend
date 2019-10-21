module.exports = (mongoose, connection) =>
    connection.model('Tecnologies', new mongoose.Schema({
        name: String,
        link: String,
        file: String
    }))