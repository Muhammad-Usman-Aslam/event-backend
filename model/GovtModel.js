
const mongoose = require('mongoose')
const govtSchema = mongoose.Schema({

    name:{type:String, required:true},
    email:{type:String, required:true},
})
module.exports = mongoose.model('govt', govtSchema)