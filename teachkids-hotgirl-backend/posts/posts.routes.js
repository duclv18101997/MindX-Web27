const express = require('express');
const postsRouter = express.Router();
const PostModel = require('./posts.model');
const Joi = require('@hapi/joi');


postsRouter.post(`/create`, async (req, res) => {
    try {
        //check login
        if (req.session.currentUser || req.session.currentUser.email) {
            //validate
            const postValidateschema = Joi.object().keys({
                imgUrl: Joi.string().required(),
                content: Joi.string().required(),
            });
            const validateResult = Joi.validate(req.body, postValidateschema);
            if (validateResult.error) {
                const error = validateResult.error.details[0];
                res.status(400).json({
                    success: false,
                    message: error.message,
                })
            } else {
                try {
                    //create
                    const newPost = await PostModel.create({
                        content: req.body.content,
                        imgUrl: req.body.imgUrl,
                        author: req.session.currentUser._id
                    });
                    res.status(201).json({
                        success: true,
                        data: newPost,
                    });
                } catch (err) {
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                }
            }
        } else {
            res.status(403).json({
                success: false,
                message: 'You must be login to create new post',
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

postsRouter.get(`/:postId`, async (req,res) => {
    try{
        const post = await PostModel.findById(req.params.postId)
        .populate('author','_id email fullName avatarUrl    ')
        .lean();
        res.status(200).json({
            success: true,
            data: post,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})


postsRouter.get(`/get/post`, async (req,res) => {
    
        //paginantion 
        //phân trang có 2 loại: 1. infinite scroll 
        //2. offset paging => pageNumber | pageSize  => limit|skip
        const pageNumber = Number(req.query.pageNumber);
            const pageSize = Number(req.query.pageSize);
        const validateSchema = Joi.object().keys({
            pageNumber : Joi.number().min(1),
            pageSize: Joi.number().min(2).max(50)
        })
        const validateResult = Joi.validate({
            pageNumber: pageNumber,
            pageSize: pageSize
        }, validateSchema);
        if (validateResult.error) {
            const error = validateResult.error.details[0];
            res.status(400).json({
                success: false,
                message: error.message,
            })
        } else {
            //get data
            const result = await PostModel.find({})
            .populate('author', '_id fullName email')
            .sort({createdAt: -1})   //1 tang dan, 2 giam dan
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()

            const total = await PostModel.find({}).countDocuments();
          
           res.status(200).json({
               success: true,
               data: result,
               total: total
           })
        }

   
})

module.exports = postsRouter;