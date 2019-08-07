const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  //hỗ trợ đọc thông tin từ body ra
const fs = require('fs');

const app = express();
//public folder
app.use(express.static('public'));
app.use(bodyParser.json());

// 4 method hay dung : get/post/put/delete
//method + address
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/home.html'));
});

//dirname: current working folder
app.get('/ask', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/ask.html'));
});

//hứng request lên server
app.post('/create-question', (req, res) => {
    //res.send => trả về text
    //console.log(req.body);

    const newQuestion = {
        content: req.body.questionContent,
        like: 0,
        dislike: 0,
        id: new Date().getTime(),
    };
    //readfile
    fs.readFile('data.json', { encoding: 'utf8' }, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            })
        } else {
            //json
            const questions = JSON.parse(data);
            questions.push(newQuestion);

            //writefile
            fs.writeFile('data.json', JSON.stringify(questions), (error) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                } else {
                    res.status(201).json({
                        success: true,
                        data: newQuestion
                    });
                }
            })
        }
        //push newQuestion
        //writefile
        // res.json({
        //     success: true,

        // });
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
    
    console.log(req.query);
    fs.readFile('data.json', { encoding: 'utf8' }, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            })
        } else {
            const listQuestion = JSON.parse(data);
            listQuestion.forEach(item => {
                if (item.id == questionId) {
                    res.status(201).json({
                        success: true,
                        data: item,
                    })
                }
            })

        };


    })
});

app.get('/get-random-question', (req, res) => {
    fs.readFile('data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                sucess: false,
                message: error.message
            })
        } else {
            const listQuestion = JSON.parse(data);
            const randomQuestion = listQuestion[Math.floor(Math.random() * listQuestion.length)];

            res.status(201).json({
                sucess: true,
                message: randomQuestion,
            })
        }
    })
})

app.post('/save-vote', (req, res) => {
   
    fs.readFile('data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                sucess: false,
                message: error.message
            })
        } else {
            const listQuestion = JSON.parse(data);
            listQuestion.forEach(item => {
                if (item.id == req.body.questionContent.id) {
                    item.like = req.body.questionContent.like;
                    item.dislike = req.body.questionContent.dislike;
                    fs.writeFile('data.json', JSON.stringify(listQuestion), (err) => {
                        if (err) {
                            res.status(500).json({
                                sucess: false,
                                message: error.message
                            })
                        } else {
                            res.status(201).json({
                                sucess: true,
                                data: item
                            })
                        }
                    })
                }
            })


        };
    })
})


app.listen(3000, (error) => {
    if (error) {
        console.log('Error: ', error);
    }
    else {
        console.log('Server listen on port 3000...');
    }
});

