
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
 require('./admin');

const Users=mongoose.model("admin")
// const User1=mongoose.model("users")
//Import Routes

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

dotenv.config();

//connect to DB

const mongoUri= "mongodb+srv://connectdb:Rhino94@cluster0.gewim.mongodb.net/jwt?retryWrites=true&w=majority"

mongoose.connect(mongoUri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true },
    () => console.log('connected to DB'));

//Middlewares

app.use(express.json());

//Route Middlewares

app.use('/api/user', authRoutes);
app.use( '/api', postRoutes);



app.get('/get',async  (req,res)=>{
    await Users.find({})
  .then(data=>{
   res.send(data);  
}).catch(err=>{
console.log(err)
})
})

app.post('/send', async (req,res)=>{
    const user = new Users({
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

app.post('/delete',async  (req,res)=>{
    await Users.findByIdAndRemove(req.body.id)
  .then(data=>{console.log(data)
   res.send(data);  
}).catch(err=>{
console.log(err)
})
})

app.post('/update',async  (req,res)=>{
    await Users.findByIdAndUpdate(req.body.id,
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

app.listen(3000,() => console.log('server running'));
