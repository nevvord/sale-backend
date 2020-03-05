const router = express.Router()
const verify = require('../../middleware/verifyToken')

const login = require('./controllers/auth/login')
const addUser = require('./controllers/auth/add')
const user = require('./controllers/auth/user')
const logout = require('./controllers/auth/logout')
const upworksAdd = require('./controllers/upworks/add')
const upworksGet = require('./controllers/upworks/get')
const upworksDelete = require('./controllers/upworks/delete')
const upworksChangeStatus = require('./controllers/upworks/upworksChangeStatus')

router  .post('/auth/login', login)
        .use(verify)
        .post('/auth/logout', logout)
        .post('/auth/add', addUser)
        .get('/auth/user', user)
        .post('/upworks/add', upworksAdd)
        .get('/upworks/get', upworksGet)
        .delete('/upworks/delete/:id', upworksDelete)
        .get('/board/work/:UpworksID/:WorkID', upworksChangeStatus)

module.exports = router

