const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
})
const admin = mongoose.model("admin",adminSchema)
module.exports = admin
