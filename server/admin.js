const  mongoose  = require('mongoose')

const adminSchema  = new mongoose.Schema({
    name: String,
    position: String,
    email: String,
    phone: String,
    
})

mongoose.model("admin", adminSchema)