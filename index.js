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










/*

//  Delete, all functions

app.delete('/technology/:id', (req, res) => {
    db.collection('technology').find({
        _id: new ObjectID(req.params.id)
    }).toArray((err, result) => {
        db.collection('technology').deleteOne({
                _id: new ObjectID(req.params.id)
            },
            (err, resultat) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                fs.unlink('uploads/' + result[0].file, err => {});
                res.sendStatus(200)
            }
        );
    });
});

app.delete('/specialization/:id', (req, res) => {
    db.collection('specialization').find({
        _id: new ObjectID(req.params.id)
    }).toArray((err, result) => {
        db.collection('specialization').deleteOne({
                _id: new ObjectID(req.params.id)
            },
            (err, resultat) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                fs.unlink('uploads/' + result[0].file, err => {});
                res.sendStatus(200)
            }
        );
    });
});

app.delete('/works/:id', (req, res) => {
    db.collection('works').find({
        _id: new ObjectID(req.params.id)
    }).toArray((err, result) => {
        db.collection('works').deleteOne({
                _id: new ObjectID(req.params.id)
            },
            (err, resultat) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                fs.unlink('uploads/' + result[0].file, err => {});
                res.sendStatus(200)
            }
        );
    });
});

app.delete('/project/:id', (req, res) => {
    db.collection('project').find({
        _id: new ObjectID(req.params.id)
    }).toArray((err, result) => {
        db.collection('project').deleteOne({
                _id: new ObjectID(req.params.id)
            },
            (err, resultat) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                fs.unlink('uploads/' + result[0].file, err => {});
                res.sendStatus(200)
            }
        );
    });
});

app.delete('/page/:id', (req, res) => {
    db.collection('page').deleteOne({
            _id: new ObjectID(req.params.id)
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
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

app.put('/specProj/:id', (req, res) => {
    db.collection('specialization').updateOne({
            _id: new ObjectID(req.params.id)
        }, {
            $set: {
                projects: req.body.projects
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
    if (req.file) {
        let body = {
            id: req.params.id,
            name: req.body.name,
            link: req.body.link,
            description: req.body.description,
            file: req.file.filename
        };
        db.collection('project').find(req.params.id).toArray((request, result) => {
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
                (err, resultat) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                    fs.unlink('uploads/' + result[0].file, err => {});
                    res.send(body);
                });
        });
    } else {
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
                name: req.body.name,
                display: req.body.display
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
            technology: req.body.technology.split(','),
            projects: req.body.projects.split(',')
        };
        db.collection('specialization').find(req.params.id).toArray((request, result) => {
            db.collection('specialization').updateOne({
                    _id: new ObjectID(req.params.id)
                }, {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        file: req.file.filename,
                        technology: req.body.technology.split(','),
                        projects: req.body.projects.split(',')
                    }
                }, {
                    upsert: true
                },
                (err, resultat) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                    fs.unlink('uploads/' + result[0].file, err => {});
                    res.send(bodyReturn);
                });
        });
    } else {
        let bodyReturn = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            technology: req.body.technology.split(','),
            projects: req.body.projects.split(',')
        };
        db.collection('specialization').updateOne({
                _id: new ObjectID(req.params.id)
            }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    technology: req.body.technology.split(','),
                    projects: req.body.projects.split(',')
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

app.put('/workProj/:id', (req, res) => {
    db.collection('works').updateOne({
            _id: new ObjectID(req.params.id)
        }, {
            $set: {
                projects: req.body.projects
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
            technology: req.body.technology.split(','),
            projects: req.body.projects.split(',')
        };
        db.collection('works').find(req.params.id).toArray((request, result) => {
            db.collection('works').updateOne({
                    _id: new ObjectID(req.params.id)
                }, {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        file: req.file.filename,
                        technology: req.body.technology.split(','),
                        projects: req.body.projects.split(',')
                    }
                }, {
                    upsert: true
                },
                (err, resultat) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                    fs.unlink('uploads/' + result[0].file, err => {});
                    res.send(bodyReturn);
                });
        });
    } else {
        let bodyReturn = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            technology: req.body.technology.split(','),
            projects: req.body.projects.split(',')
        };
        db.collection('works').updateOne({
                _id: new ObjectID(req.params.id)
            }, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    technology: req.body.technology.split(','),
                    projects: req.body.projects.split(',')

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

app.put('/projInner/:id', (req, res) => {
    db.collection('project').updateOne({
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
*/