const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const keygen = require('keygenerator');
const nodemailer = require('nodemailer');   

//CFG Head
/**MAIL */
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nevvzbs@gmail.com',
        pass: 'maska3006556rad'
    }
});


let sendMAil = (key) => {
    let mailOptions = {
        form: 'nevvzbs@gmail.com',
        to: 'nevvord@gmail.com',
        subject: 'MAIL from NCP',
        text: `Для входа в акаунт введите: ${key}`
    
    };
    
    transporter.sendMail(mailOptions, (err, info)=>{
        err ? console.log(err) : console.log('Email sant: ' + info.response);
    });
};

/**MAIL */
//Multer
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
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
/** MULTER*/
/**DB */
const dbURL = 'mongodb://localhost:27017',
      dbName = 'sergWork';
/**DB */
/**EXPRES CORS */
let app = express(),
    db;
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
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
app.use(bodyParser.json({
    limit: '100mb',
    parameterLimit: 100000
}));

/**
app.use((req, res, next) => {
    return next();
})
 */
//CFG Head
//Авторизация
let key = '', avtorize = false;
app.post('/login', (req, res)=>{
    key = keygen._();
    sendMAil(key);
    res.sendStatus(200);
});

app.post('/loginKey', (req, res)=>{
    if (key === req.body.key){
        avtorize = true;
        res.send({avtorize: true});
    }else{
        avtorize = false;
        res.send({avtorize: false});
    }
});

app.get('/login', (req, res)=>{
    if(avtorize === true){
        res.send({key: key});
    }else{
        res.send({key: false})
    }
});

//Авторизация
// GET

app.get('/', (req, res) => {
    res.send('All Work');
});

app.get('/works', (req, res) => {
    db.collection('works').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);

    });
});

app.get('/specialization', (req, res) => {
    db.collection('specialization').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.get('/technology', (req, res) => {
    db.collection('technology').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.get('/project', (req, res) => {
    db.collection('project').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.get('/page', (req, res) => {
    db.collection('page').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

// GET
// POST

app.post('/specialization', upload.single('image'), (req, res, next) => {
    let body = {
        name: req.body.name,
        description: req.body.description,
        technology: req.body.technology.split(','),
        inner: req.body.inner,
        file: req.file.filename
    };


    db.collection('specialization').insert(body, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(body);
        console.log(body);
        
    });
});

app.post('/works', upload.single('image'), (req, res, next) => {
    let body = {
        name: req.body.name,
        description: req.body.description,
        technology: req.body.technology.split(','),
        inner: req.body.inner,
        file: req.file.filename
    };


    db.collection('works').insert(body, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(body);
    });
});

app.post('/project', upload.single('image'), (req, res, next) => {
    let body = {
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        file: req.file.filename
    };


    db.collection('project').insert(body, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(body);
    });
});


app.post('/technology', upload.single('image'), (req, res, next) => {
    let body = {
        name: req.body.name,
        link: req.body.link,
        file: req.file.filename
    };


    db.collection('technology').insert(body, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(body);
    });
});

app.post('/page', (req, res, next) => {
    let body = {
        name: req.body.name,
        inner: req.body.inner
    };


    db.collection('page').insert(body, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(body);
    });
});

// POST
//  Delete, all functions

app.delete('/technology/:id', (req, res) => {
    db.collection('technology').deleteOne({
            _id: new ObjectID(req.params.id)
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return result.sendStatus(500);
            }
            res.sendStatus(200)
        });
});

app.delete('/specialization/:id', (req, res) => {
    db.collection('specialization').deleteOne({
            _id: new ObjectID(req.params.id)
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return result.sendStatus(500);
            }
            res.sendStatus(200)
        });
});

app.delete('/works/:id', (req, res) => {
    db.collection('works').deleteOne({
            _id: new ObjectID(req.params.id)
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return result.sendStatus(500);
            }
            res.sendStatus(200)
        });
});

app.delete('/project/:id', (req, res) => {
    db.collection('project').deleteOne({
            _id: new ObjectID(req.params.id)
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return result.sendStatus(500);
            }
            res.sendStatus(200)
        });
});

app.delete('/page/:id', (req, res) => {
    db.collection('page').deleteOne({
            _id: new ObjectID(req.params.id)
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return result.sendStatus(500);
            }
            res.sendStatus(200)
        });
});

// DELETE
// PUT

app.put('/specTech/:id', (req, res) => {
    db.collection('specialization').updateOne({
            _id: new ObjectID(req.params.id)
        }, {
            $set: {
                technology: req.body.technology
            }
        }, {
            upsert: true
        },
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
});

app.put('/project/:id', upload.single('image'), (req, res) => {
    if(req.file){
        let body = {
            id: req.params.id,
            name: req.body.name,
            link: req.body.link,
            description: req.body.description,
            file: req.file.filename
        };
        db.collection('project').updateOne({
                _id: new ObjectID(req.params.id)
            }, {
                $set: {
                    name: req.body.name,
                    link: req.body.link,
                    description: req.body.description,
                    file: req.file.filename,
                }
            }, {
                upsert: true
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.send(body);
            });
    }else{
        let body = {
            id: req.params.id,
            name: req.body.name,
            link: req.body.link,
            description: req.body.description,
        };
        db.collection('project').updateOne({
                _id: new ObjectID(req.params.id)
            }, {
                $set: {
                    name: req.body.name,
                    link: req.body.link,
                    description: req.body.description
                }
            }, {
                upsert: true
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.send(body);
            });
    }
});

app.put('/specInner/:id', (req, res) => {
    db.collection('specialization').updateOne({
            _id: new ObjectID(req.params.id)
        }, {
            $set: {
                inner: req.body.inner
            }
        }, {
            upsert: true
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
});

app.put('/page/:id', (req, res) => {
    db.collection('page').updateOne({
            _id: new ObjectID(req.params.id)
        }, {
            $set: {
                inner: req.body.inner,
                name: req.body.name
            }
        }, {
            upsert: true
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
});

app.put('/specialization/:id', upload.single('image'), (req, res) => {
    if (req.file) {
        let bodyReturn = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            file: req.file.filename,
            technology: req.body.technology.split(',')
        };
        db.collection('specialization').updateOne({
                _id: new ObjectID(req.params.id)
            }, {
                $set: {
                    id: req.params.id,
                    name: req.body.name,
                    description: req.body.description,
                    file: req.file.filename,
                    technology: req.body.technology.split(',')

                }
            }, {
                upsert: true
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.send(bodyReturn);
            }
        );
    } else {
        let bodyReturn = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            technology: req.body.technology.split(',')
        };
        db.collection('specialization').updateOne({
                _id: new ObjectID(req.params.id)
            }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    technology: req.body.technology.split(',')

                }
            }, {
                upsert: true
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.send(bodyReturn);
            }
        );
    }
});

app.put('/workTech/:id', (req, res) => {
    db.collection('works').updateOne({
            _id: new ObjectID(req.params.id)
        }, {
            $set: {
                technology: req.body.technology
            }
        }, {
            upsert: true
        },
        (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
});

app.put('/works/:id', upload.single('image'), (req, res) => {
    if (req.file) {
        let bodyReturn = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            file: req.file.filename,
            technology: req.body.technology.split(',')
        };
        db.collection('works').updateOne({
                _id: new ObjectID(req.params.id)
            }, {
                $set: {
                    id: req.params.id,
                    name: req.body.name,
                    description: req.body.description,
                    file: req.file.filename,
                    technology: req.body.technology.split(',')

                }
            }, {
                upsert: true
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.send(bodyReturn);
            }
        );
    } else {
        let bodyReturn = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            technology: req.body.technology.split(',')
        };
        db.collection('works').updateOne({
                _id: new ObjectID(req.params.id)
            }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    technology: req.body.technology.split(',')

                }
            }, {
                upsert: true
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.send(bodyReturn);
            }
        );
    }
});

app.put('/workInner/:id', (req, res) => {
    db.collection('works').updateOne({
            _id: new ObjectID(req.params.id)
        }, {
            $set: {
                inner: req.body.inner
            }
        }, {
            upsert: true
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
});

// Config

MongoClient.connect(dbURL, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    db = client.db(dbName);

    app.listen(3012, () => {
        console.log("Nevvord server started");
    });
});