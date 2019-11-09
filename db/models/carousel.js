module.exports = (mongoose, connection) => 
    connection.model('Carousel', new mongoose.Schema({
        name: String,
        inner: String,
        file: String
    }))