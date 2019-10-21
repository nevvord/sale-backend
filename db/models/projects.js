module.exports = (mongoose, connection) =>
    connection.model('Projects', new mongoose.Schema({
        name: String,
        description: String,
        inner: String,
        link: String,
        file: String
    }))