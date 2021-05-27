const router = require('express').Router();
const verify = require('./verifyToken')
const admin = require('../admin');

router.get('/posts', verify, async (req,res) =>{
    // console.log(req.user)
   res.send(req.user.name);
    
});

router.get('/get',async  (req,res)=>{
    await admin.find({})
  .then(data=>{
   res.send(data);  
}).catch(err=>{
console.log(err)
})
})

router.post('/send', async (req,res)=>{
    const user = new admin({
        name: req.body.name,
        position: req.body.position,
        email: req.body.email,
        phone: req.body.phone,
    })
    const savedPost = await user.save()
    .then(data=>{console.log(data)
        res.send(data); 
}).catch(err=>{
console.log(err)
})
})

router.post('/delete',async  (req,res)=>{
    await admin.findByIdAndRemove(req.body.id)
  .then(data=>{console.log(data)
   res.send(data);  
}).catch(err=>{
console.log(err)
})
})

router.post('/update',async  (req,res)=>{
    await admin.findByIdAndUpdate(req.body.id,
        {
            name: req.body.name,  
            position: req.body.position,
            email: req.body.email,
            phone: req.body.phone,
        })
  .then(data=>{console.log(data)
   res.send(data);  
}).catch(err=>{
console.log(err)
})
})

module.exports = router;
