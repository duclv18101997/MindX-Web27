const fs = require('fs');

// fs.readFile('./data.txt',{encoding: 'utf8'},(err,data) => {
//     console.log('Error: ',err);
//     console.log('Data: ',data);
// });

//write file
// fs.writeFile('data.txt','test writefile',{encoding: 'utf8'},(err) => {
//     if(err) console.log('Error: ',err);
//     console.log('File saved');
// })

//watch file
fs.watchFile('./data.txt',(current, previous) => {
    console.log('File changed');
})