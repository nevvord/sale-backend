const router = express.Router()

const registration = require('./controllers/registration/post')

router  .post('/registration', registration)

module.exports = router

