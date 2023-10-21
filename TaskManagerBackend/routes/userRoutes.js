const express = require('express');
const router = express.Router();
const USER = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register a user
router.post('/register', async (req,res)=>{
    try{
        const {name , email , password} = req.body;

        const isUserExist = await USER.findOne({email});
        if(isUserExist){
            return res.status(400).json({
                message : 'User already exist!'
            });
        }

        // dont need these lines of codes because we are using pre save hook in user model
        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(password,salt);

        const user = await new USER({
            name,
            email,
            password
        }).save();

        res.json({
            message : 'user registered!',
            USER : user
        });
    }
    catch(err){
        res.status(500).json({
            message : err.message
        });
    }
});

// login a user
router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;

        const isUserExist = await USER.findOne({email});
        if(!isUserExist){
            return res.status(400).json({
                message : 'User does not exist!'
            });
        }

        const isPasswordMatched = await bcrypt.compare(password,isUserExist.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                message : 'Invalid Credentials!'
            });
        }

        const accessToken = jwt.sign({
            id : isUserExist._id,
        },process.env.JWT_SECRET_KEY,);

        res.json({
            message : 'User logged in!',
            accessToken : accessToken
        });
    }
    catch(err){
        res.status(500).json({
            message : err.message
        });
    }
});



module.exports = router;