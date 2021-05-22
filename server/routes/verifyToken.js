const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User')
module.exports = function(req,res,next) {
    const token = req.header('auth-token');
    if(!token)
        return res.status(401).send('Access Denied');
   
       jwt.verify(token, process.env.TOKEN_SECRET, async (err,payload)=>{
           if(err){
            return res.status(400).send('You must be logged in');
           }
           const {_id} = payload;
           const user = await User.findById(_id)
           req.user = user;
           next();
        }) 
}