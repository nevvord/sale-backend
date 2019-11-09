module.exports = (mongoose, connection) => 
    connection.model('Inner', new mongoose.Schema({
        inner: String
    }))