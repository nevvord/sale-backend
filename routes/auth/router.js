const router = express.Router()

const authentication = require('./plugins/authentication')
const login = require('./plugins/login')
const logout = require('./plugins/logout')

router
    .post('/authentication', authentication)
    .post('/login', login)
    .post('/logout', logout)

module.exports = router

