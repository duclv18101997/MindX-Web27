const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  //hỗ trợ đọc thông tin từ body ra
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./model');  // không cần viết đuôi file
mongoose.connect('mongodb://localhost:27017/quyetde', { useNewUrlParser: true }, (e) => {
    if (e) {
        console.log(e);
        process.exit();
    } else {
        console.log('Connect to db successfully');
        //start app


        const app = express();
        //public folder
        app.use(express.static('public'));
        app.use(bodyParser.json());

        // 4 method hay dung : get/post/put/delete
        //method + address
        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/index.html'));
        });

        //dirname: current working folder
        app.get('/ask', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/ask.html'));
        });

        app.get('/search', (req, res) => {
            res.sendFile(path.resolve(__dirname, './public/search.html'));
        });

        //hứng request lên server
        app.post('/create-question', (req, res) => {
            //res.send => trả về text
            //console.log(req.body);

            const newQuestion = {
                content: req.body.questionContent,
                // like: 0,
                // dislike: 0, 
                // id: new Date().getTime(),
            };

            QuestionModel.create(newQuestion, (err, data) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    })
                } else {
                    res.status(201).json({
                        success: true,
                        data: {
                            ...data._doc,
                            id: data._doc._id,
                        },

                    })
                }
            });

            
        });

        app.get('/questions/:questionId', (req, res) => {
            //params
            //req.params.questionId
            res.sendFile(path.resolve(__dirname, './public/question-detail.html'));
        });

        app.get('/get-question-by-id', (req, res) => {
            //logic 
            //query
            const questionId = req.query.questionId;
            QuestionModel.findById(questionId, (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                } else {
                    if(!data){
                        res.status(404).json({
                            success: false,
                            message: `Question not found`,
                        })
                    }else{
                        res.status(201).json({
                        success: true,
                        data: {
                            ...data._doc,
                            id: data._id,
                        },
                    })
                    }
                }
            })
        });

        app.get('/get-random-question', (req, res) => {
			QuestionModel.aggregate([
				{$sample: {size: 1}},
			], (error, data) => {   //data is array
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					const selectedQuestion = data[0];
					res.status(200).json({
						success: true,
						data: {
							...selectedQuestion,
							id: selectedQuestion._id,
						},
					});
				}
			});
		});
  
        app.put('/save-vote', (req, res) => {
			const questionId = req.body.questionId;
			const selectedVote = req.body.selectedVote;

			QuestionModel.findByIdAndUpdate(questionId, {$inc: {
				[selectedVote]: 1,
			}}, (error) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					res.status(201).json({
						success: true,
					})
				}
			});
		});

        app.get('/search-question', (req, res) => {
			const keyword = req.query.keyword;

			QuestionModel.find({
				content: {$regex: keyword, $options: 'i'},
			}, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					res.status(200).json({
						success: true,
						data: data,
					});
				}
			});
		});

    app.listen(3000, (error) => {
        if (error) {
            console.log('Error: ', error);
        }
        else {
            console.log('Server listen on port 3000...');
        }
    });

    }
});



