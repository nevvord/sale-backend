module.exports = (mongoose, connection) => 
    connection.model('Files', new mongoose.Schema({
        file: String
    }))