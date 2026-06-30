const cors = require("cors")
const fs = require('fs')
const MobileModel = require('../model/model')




const mobileAddData = async(req, res)=>{

try{
    const {company, name, model, price, description , color, location } =req.fields
    const {photo} = req.files
    const data = new MobileModel({ ...req.fields })
    if(photo){
      data.photo.data = fs.readFileSync(photo.path)
      data.contentType = photo.type
    }
    console.log(data)

    await data.save()
    res.status(201).send({message: " Mobile data sent successfullly"})
}
catch(err){
    res.status(400).send(err.message)
}

}


const mobileGetData = async(req, res)=>{
    try{
        const mobile = await MobileModel.find().select("-photo")
        res.send(mobile)
    }
    catch(err){
        res.status(400).send(err.message)
    }
}

const mobilePhoto = async (req, res) => {
  const {id} = req.params
  try {
    const product = await MobileModel.findById(id).select("photo");

    if (!product?.photo?.data) {
      return res.status(404).send({ message: "Photo not found" });
    }

    res.set('Content-Type', product.contentType);
    return res.send(product.photo.data);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: err.message });
  }
};

  

module.exports = {mobileAddData, mobileGetData,mobilePhoto}
