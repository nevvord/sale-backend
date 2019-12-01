const router = express.Router()

const authentication = require('./controllers/authentication')
const login = require('./controllers/login')
const logout = require('./controllers/logout')
const registration = require('./controllers/registration')

router
    .post('/authentication', authentication)
    .post('/login', login)
    .post('/logout', logout)
    .post('/registration', registration)

module.exports = router

