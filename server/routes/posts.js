const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/get', verify, async (req,res) =>{
    // console.log(req.user)
   res.send(req.user.name);
    
});


module.exports = router;