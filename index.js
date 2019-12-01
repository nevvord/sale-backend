const   express         =   require('express')
const   bodyParser      =   require('body-parser')
const   cookieparser    =   require('cookie-parser')
const   db              =   require('./db/index')()
const   cors            =   require('cors')
const   multer          =   require('./plugins/multer')
//==== Middleware =====
const   verifyToken     =   require('./middleware/verifyToken')
//===== Glogal CFG =====
global.db       = db
global.express  = express
global.multer   = multer

//===== Config sets =====
const { serverConfig } = require('config')

//===== Set up express APP =====
const app = express()

//===== APP USE =====
app.use(express.static('uploads'))
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
}))
app.use(cookieparser())

//===== Routes =====
const auth = require('./router/auth')
const api = require('./router/api')
const store = require('./router/store')

app.get('/', (req, res) => {
    res.send({
        api: "worked"
    })
})
app.use('/auth', auth.router)
app.use('/api', verifyToken , api.router)
app.use('/store', verifyToken , store.router)

//==== Listen Requests =====
app.listen(serverConfig.port, () => console.log(`Server has been running in ${serverConfig.host}:${serverConfig.port}`))