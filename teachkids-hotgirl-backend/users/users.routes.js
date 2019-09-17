const express = require('express');
const usersRouter = express.Router();
const UsersModel = require('./users.model');
const bcryptjs = require('bcryptjs');

usersRouter.post('/register', async (req, res) => {
    try {
        //validate email
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!emailRegex.test(req.body.email)) {
            res.status(400).json({
                success: false,
                message: 'Invalid email address',
            })
        } else if (req.body.password.length < 6) {
            //validate password
            res.status(400).json({
                success: false,
                message: 'Password must be more than 6 characters',
            })
        } else {
            //email exist?
            const data = await UsersModel.findOne({ email: req.body.email }).lean();
            if (data) {
                res.status(400).json({
                    success: false,
                    message: 'Email has been used'
                })
            } else {
                //hash password
                const hasPassword = bcryptjs.hashSync(req.body.password, 10);

                //create user record
                const newUser = await UsersModel.create({
                    email: req.body.email,
                    password: hasPassword,
                    fullName: req.body.fullName,
                });
                res.status(201).json({
                    success: true,
                    data: newUser,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

});

usersRouter.post('/login', async (req,res) => {
    try{
        const user = await UsersModel.findOne({ email: req.body.email }).lean();
            if (!user) {
                res.status(400).json({
                    success: false,
                    message: 'User not found'
                })
            } else if(!bcryptjs.compareSync(req.body.password, user.password)){
                res.status(400).json({
                    success: false,
                    message: 'Wrong password'
                })
            } else{
                req.session.currentUser = {
                    _id: user._id,
                    email: user.email
                };

                res.status(200).json({
                    success: true,
                    message: 'login success',
                    data: {
                        email: user.email,  // luu email phuc vu cho hien thi nguoi dung
                        fullName: user.fullName
                    }
                });
            }

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}); 

usersRouter.get('/logout', (req,res) => {
    req.session.destroy();
    res.status(200).json({
        success: true,
        message: 'Logout success',
    })
}) 

usersRouter.get('/test', (req,res) => {
    console.log(req.session.currentUser);
    res.json({
        success: true,
    })
});

module.exports = usersRouter;