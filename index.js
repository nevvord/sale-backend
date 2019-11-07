//const fs = require('fs');
const   express         =   require('express')
const   bodyParser      =   require('body-parser')
const   cookieparser    =   require('cookie-parser')
const   db              =   require('./db/index')()
const   cors            =   require('cors')
const   multer          =   require('./plugins/multer')

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
const auth = require('./routes/auth')
const api = require('./routes/api/')

app.get('/', (req, res) => {
    res.send({
        api: "worked"
    })
})
app.use('/user', auth.router)
app.use('/api', api.router)

//==== Listen Requests =====
app.listen(serverConfig.port || '3377', serverConfig.host || 'localhost', () => {
    console.log(`Server has been started in ${serverConfig.host}:${serverConfig.port}`);
})