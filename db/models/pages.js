module.exports = (mongoose, connection) => 
    connection.model('Pages', new mongoose.Schema({
        name: String,
        inner: String,
        position: Number,
        display: Boolean
    }))