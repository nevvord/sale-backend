module.exports = (mongoose, connection) =>
    connection.model('Admins', new mongoose.Schema({
        password: { type: String, required: true },
        login: { type: String, required: true },
        updated: { type: Date, default: Date.now }
    }))
