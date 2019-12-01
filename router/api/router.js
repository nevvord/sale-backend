const router = express()

const secret = require('./controllers/secret/get')


router  .get('/secret', secret)


module.exports = router