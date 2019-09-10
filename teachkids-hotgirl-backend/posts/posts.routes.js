const express = require('express');
const postsRouter = express.Router();
const PostModel = require('./posts.model');
const bcryptjs = require('bcryptjs');

postsRouter.post(`/create`, async (req,res) => {
    try{    
        //check login
       if(req.session.currentUser ){
           //create
           PostModel.create({
               content: req.body.content,
               imgUrl: req.body.imgUrl,
               author: req.session.currentUser._id
           }, (err,data) => {
               if(err){
                res.status(500).json({
                    success: false,
                    message: error.message,
                  });
               }else{
                res.status(201).json({
                    success: true,
                    data: data,
                    
                  });
                  console.log(data);
               }
           })
       }else{
        res.status(401).json({
            success: false,
            message: 'You must be login to create new post',
          });
       }

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = postsRouter;