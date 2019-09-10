const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ScoreKeeperModel = require('./model');

mongoose.connect('mongodb://localhost:27017/score-keeper', { useNewUrlParser: true }, (e) => {
    if (e) {
        process.exit();
    } else {
        console.log('connect to mongoDb success...');

        // start app
        const app = express();

        // public folder
        app.use(express.static('public'));
        app.use(bodyParser.json());
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })

        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/html/create-screen.html'));
        });

        app.post('/create-new-game', (req, res) => {
            const newGame = {
                playerA: {
                    name: req.body.playerA,
                    scores: [],
                },
                playerB: {
                    name: req.body.playerB,
                    scores: [],
                },
                playerC: {
                    name: req.body.playerC,
                    scores: [],
                },
                playerD: {
                    name: req.body.playerD,
                    scores: [],
                },
            };

            ScoreKeeperModel.create(newGame, (error, data) => {
                if (error) {
                    res.status(201).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: {
                            ...data._doc,
                        },
                    });
                }
            });
        });

        app.get('/games/:somekindofId', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/html/play-screen.html'));
        });

        app.get('/get-game-by-id', (req, res) => {
            const gameId = req.query.gameId;
            ScoreKeeperModel.findById(gameId, (error, data) => {
                if (error) {
                    res.status(200).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    if (!data) {
                        res.status(404).json({
                            success: false,
                            message: 'Game not found',
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: data,
                        });
                    }
                }
            });
        });

        app.put('/update-score', (req, res) => {
            const updateKey = `${req.body.player}.scores.${req.body.index}`;
            ScoreKeeperModel.findByIdAndUpdate(
                                            {
                                                _id: req.body.data._id,
                                            },
                                            {
                                                $set: {
                                                        [updateKey]: req.body.scoreValue,
                                                    }
                                            },
                                            {
                                                new: true,
                                            },
                                            (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: data,
                    });
                }
            });
        });

        app.put('/add-new-round', (req, res) => {
            ScoreKeeperModel.findByIdAndUpdate(
                                            {
                                                _id: req.body.id,
                                            },
                                            {
                                                $push: {
                                                        'playerA.scores': 0,
                                                        'playerB.scores': 0,
                                                        'playerC.scores': 0,
                                                        'playerD.scores': 0,
                                                    }
                                            },
                                            (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: data,
                    });
                }                           
            });
        });

        app.listen(8080, error => {
            if (error) {
                console.log(error);
            } else {
                console.log('Server listen on port 8080 ...');
            }
        });
    }
});