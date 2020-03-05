module.exports = (mongoose, connection) =>
    connection.model('UpWorks', new mongoose.Schema({
        type: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        updated: { type: Date, default: Date.now },
        works: [new mongoose.Schema({
            _id: String,
            name: String,
            status: Boolean
        })]
    }))
