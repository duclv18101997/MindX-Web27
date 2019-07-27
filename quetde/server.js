const express = require('express');
const path = require('path');

const app = express();
//public folder
app.use(express.static('public'));

// 4 method hay dung : get/post/put/delete
//method + address
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./public/home.html'));
});

//dirname: current working folder
app.get('/about',(req,res) => {
    res.sendFile(path.resolve(__dirname,'./public/about.html'));
})

app.listen(2000, (error) => {
    if(error) console.log('Error: ',error);
    else{
        console.log('Server listen on port 2000...');
    }
});   