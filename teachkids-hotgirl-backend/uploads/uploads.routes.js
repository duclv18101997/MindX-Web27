const express = require('express');
const multer = require('multer');
const fs = require('fs');
const uploadsRouter = express.Router();
const multerStorage = multer({
    dest: 'public/',
    // fileFilter: (req,file,cb) => {
    
    // }
    //limits: {},
    
})


uploadsRouter.post(`/photos`,multerStorage.single('image'), async (req,res) => { //image la ten file trong req.body
    console.log(req.file);
    //rename
    const fileExt = req.file.originalname.split('.');
    const ext = fileExt[fileExt.length -1];
    fs.renameSync(req.file.path, `public/${req.file.filename}.${ext}`);   //doi ten file

    //return url
    res.status(200).json({
        success: true,
        data: `http://localhost:3001/${req.file.filename}.${ext}`
    })
    
})
module.exports = uploadsRouter;