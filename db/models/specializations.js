module.exports = (mongoose, connection) =>
    connection.model('Specioalizations', new mongoose.Schema({
        name: String,
        description: String,
        technology: Array,
        projects: Array,
        inner: String,
        file: String
    }))