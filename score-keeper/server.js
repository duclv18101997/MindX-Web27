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

        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/html/create-screen.html'));
        });

        app.post('/create-new-game', (req, res) => {
            const scoreA = [], scoreB = [], scoreC = [], scoreD = [];
            let totalA = totalB = totalC = totalD = 0;

            const newGame = {
                player1: {
                    name: req.body.playerA,
                    score: {
                        rounds: scoreA,
                        totalScore: totalA,
                    },
                },
                player2: {
                    name: req.body.playerB,
                    score: {
                        rounds: scoreB,
                        totalScore: totalB,
                    },
                },
                player3: {
                    name: req.body.playerC,
                    score: {
                        rounds: scoreC,
                        totalScore: totalC,
                    },
                },
                player4: {
                    name: req.body.playerD,
                    score: {
                        rounds: scoreD,
                        totalScore: totalD,
                    },
                },
            };

            ScoreKeeperModel.create(newGame, (error, data) => {
                if (error) {
                    res.status(500).json({
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
                    res.status(500).json({
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
            // console.log(req.body.scoreValue);
            // console.log(req.body.data._id);
            // console.log(req.body.data);
            // const index = req.body.index;
            let total = 0;
            req.body.data.playerA.score.rounds.forEach(element => {
                total += element;
            });
            const updateKey = `${req.body.player}.scores.rounds.${req.body.index}`;
            console.log(updateKey);
            ScoreKeeperModel.findOneAndUpdate(
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
                                                console.log(data.playerA.scores.rounds);
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