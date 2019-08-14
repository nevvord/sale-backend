const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
//const mongoose = require('mongoose');
const multer = require('multer');
const keygen = require('keygenerator');
const nodemailer = require('nodemailer');
const fs = require('fs');


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
        subject: 'MAIL NCP',
        text: `Для входа в акаунт введите: ${key}`

    };

    transporter.sendMail(mailOptions, (err, info) => {
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
        fileSize: 1920 * 1080 * 5
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
app.use(cookieParser());
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
//CFG Head
//Авторизация
app.post('/login', (req, res) => {
    const value = keygen._();

    db.collection('key').insert({
        value,
        createDate: new Date()
    }, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        sendMAil(value);
        res.sendStatus(200);
    });
});

app.post('/loginKey', (req, res) => {
    db.collection('key').find({
        value: req.body.key
    }).toArray((err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (result && result.length) {
            res.cookie('auth', req.body.key, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60
            }).send({
                avtorize: true
            });
        } else {
            res.send({
                avtorize: false
            });
        }
    });
});

app.post('/unlog', (req, res) => {
    db.collection('key').remove({}, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        res.clearCookie('auth', {
            httpOnly: true
        }).send({
            avtorize: false
        });
    });
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

//Зашита
app.use((req, res, next) => {
    const key = req.cookies.auth;
    if (!key) {
        return res.send({
            avtorize: false
        })
    }
    db.collection('key').find({
        value: key
    }).toArray((err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (result && result.length) {
            next();
        } else {
            res.sendStatus(401);
        }
    });
});

app.get('/keyproof', (req, res) => {
    return res.send({
        avtorize: true
    })
});
//Зашита

// POST

app.post('/specialization', upload.single('image'), (req, res) => {
    let body = {
        name: req.body.name,
        description: req.body.description,
        technology: req.body.technology.split(','),
        projects: req.body.projects.split(','),
        inner: req.body.inner,
        file: req.file.filename
    };


    db.collection('specialization').insert(body, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(body);
    });
});

app.post('/works', upload.single('image'), (req, res) => {
    let body = {
        name: req.body.name,
        description: req.body.description,
        technology: req.body.technology.split(','),
        projects: req.body.projects.split(','),
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

app.post('/project', upload.single('image'), (req, res) => {
    let body = {
        name: req.body.name,
        description: req.body.description,
        inner: req.body.inner,
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


app.post('/technology', upload.single('image'), (req, res) => {
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
        inner: req.body.inner,
        display: req.body.display
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