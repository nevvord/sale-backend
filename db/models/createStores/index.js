module.exports = (mongoose, connection) =>
    connection.model('CreateStores', new mongoose.Schema({
        password: { type: String, required: true },
        login: { type: String, required: true },
        email: { type: String, required: true },
        storeName: { type: String, required: true },
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        updated: { type: Date, default: Date.now }
    }))
