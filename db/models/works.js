module.exports = (mongoose, connection) =>
    connection.model('Works', new mongoose.Schema({
        name: String,
        description: String,
        technology: Array,
        projects: Array,
        inner: String,
        file: String
    }))