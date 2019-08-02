const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const mongoose = require('mongoose');   
const multer = require('multer');


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().valueOf() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const dbURL = 'mongodb://localhost:27017',
      dbName = 'sergWork';  

let app = express(), db;

app.use(express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
}));

app.options('*', cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
  }));
  
app.use(cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
  }));
  
app.use(bodyParser.json({limit: '100mb',  parameterLimit:100000}));


app.get('/', (req, res)=>{
    res.send('All Work');
});

app.get('/works',(req,res)=>{
    db.collection('works').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
        
    });
});

app.get('/specialization', (req, res)=>{
    db.collection('specialization').find().toArray((err, docs)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.post('/specialization', upload.single('image'), (req, res, next) => {
    console.log(req.file.path);
    let body = {
        name: req.body.name,
        description: req.body.description,
        technology: [req.body.technology],
        inner: req.body.inner,
        file: req.file.filename
    };
    
    
    db.collection('specialization').insert(body, (err, result)=>{
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(body);
    });
});



app.post('/technology', upload.single('image'), (req, res, next) => {
    console.log(req.file.path);
    let body = {
        name: req.body.name,
        link: req.body.link,
        file: req.file.filename
    };
    
    
    db.collection('technology').insert(body, (err, result)=>{
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(body);
    });
});

app.get('/technology', (req, res)=>{
    db.collection('technology').find().toArray((err, docs)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.delete('/technology/:id', (req, res)=>{
    db.collection('technology').deleteOne(
        {_id: new ObjectID(req.params.id)},
        (err, result)=>{
            if(err){
                console.log(err);
                return result.sendStatus(500);
            }
            res.sendStatus(200)
        });
});

MongoClient.connect(dbURL, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    db = client.db(dbName);
    
    app.listen(3012, () => {
        console.log("API STARTED");
    });
});