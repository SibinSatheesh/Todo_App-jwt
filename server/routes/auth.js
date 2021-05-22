const router = require('express').Router();
const User = require('../model/User');
const {registerValidation , loginValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {

    flag=false;
    
//Validate data before user created
const { error } = registerValidation(req.body)
    if(error)
        return res.status(400).send(error.details[0].message);
        
//Check whether the user is already in the DB
const emailExist = await User.findOne({email: req.body.email});
console.log(emailExist)
if(emailExist)
        return res.status(400).send('Email Already exists')

//Hash the password

const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(req.body.password, salt);



//Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,

    });

        const savedUser = await user.save()

        .then(data=>{console.log(data)
            res.send("Registered succesfully")
    }).catch(err=>{
        console.log(err)
    })
})

//Login
router.post('/login', async (req, res) => {

//Validate data before user created
const { error } = loginValidation(req.body)

    if(error)
        return res.status(403).send( { error: error.details[0].message});

//Checking email exists
const user = await User.findOne({email: req.body.email});
    if(!user)
        return res.status(400).send({error: 'Email not found' })
       
//Password is correct
try{
const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass)
        return  res.status(401).send({error: 'Invalid password' })
        
//create and assign a token
const token = jwt.sign({ _id: user._id },process.env.TOKEN_SECRET);
// console.log(token)
res.header('auth-token',token).send({token});
}catch(err){
    return res.status(402).send('Email not found')
}
// const token = jwt.sign({ _id: user._id },process.env.TOKEN_SECRET);
//     res.header('auth-token',token).send({token: token});
  

});

module.exports = router;

