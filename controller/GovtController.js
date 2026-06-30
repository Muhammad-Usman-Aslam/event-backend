const Govt = require('../model/GovtModel')


const  addGovt = async(req, res)=>{
    try{
const {name, email} = req.body;
const govt = new Govt({name,email});
const savedGovt = await govt.save();
res.status(201).json({message: "Successfully data stored", govt: savedGovt})
    } 
    catch(err){
res.status(400).json({message: err.message})
        
}

}

// const  = async(req, res)=>{
//     try{
// const govt = await Govt.find();
// res.status(200).json(govt)
//     }
//     catch(err){
// res.status(400).json({message: err.message})
        
// }

// }
module.exports = {addGovt}
