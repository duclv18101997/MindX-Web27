const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./users/users.routes');
const postsRouter = require('./posts/posts.routes');
const expressSession = require('express-session');
const uploadsRouter = require('./uploads/uploads.routes');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/techkids-hotgirls', { useNewUrlParser: true }, (e) => {
    if (e) {
        process.exit();
        throw (e);
    } else {
        console.log('connect to mongoDb success...');

        // start app
        const app = express();
        app.use(express.static('public'));
        app.use(cors({
            origin : ['http://localhost:3000'],
            credentials: true,
        }))
        // public folder
        //  app.use(express.static('public'));
        app.use(bodyParser.json());
        // app.use((req, res, next) => {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        // })
        app.use(expressSession({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
        }))
        //router
        
        app.use('/users', usersRouter);
        app.use('/posts', postsRouter);
        app.use('/upload', uploadsRouter);
        app.listen(3001, error => {
            if (error) {
                console.log(error);
            } else {
                console.log('Server listen on port 3001 ...');
            } 
        });
    }
});