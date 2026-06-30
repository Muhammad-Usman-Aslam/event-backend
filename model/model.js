const mongoose = require("mongoose")

const mobileSchema = mongoose.Schema({

company:{type:String, required:true},
name:{type:String, required:true},
model:{type:Number, required:true},
price:{type:Number, required:true},
description:{type:String, required:true},
color:{type:String, required:true},
location:{type:String, required:true},
photo:{data:Buffer, contentType:String}

}, {timestamp:true})

module.exports = mongoose.model("mobile", mobileSchema)