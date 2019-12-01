module.exports = (mongoose, connection) =>
    connection.model('Users', new mongoose.Schema({
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        updated: {
            type: Date,
            default: Date.now
        }
    }))
