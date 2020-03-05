const router = express.Router()

const registration = require('./controllers/registration/post')
const check = require('./controllers/check/getOne')
const get = require('./controllers/check/getAll')
const updateStore = require('./controllers/update')

router  .post('/registration', registration)
        .get('/check', check)
        .get('/get', get)
        .post('/update/:id', updateStore)

module.exports = router

