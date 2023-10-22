const jwt = require('jsonwebtoken');
const USER = require('../models/user');
require('dotenv').config();


const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await USER.findOne({_id : decoded.id});
        if(!user){
            throw new Error('Invalid token!');
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch(e){
        res.status(401).send({error : `${e.message}, Please authenticate!`});
    }
};

module.exports = auth;