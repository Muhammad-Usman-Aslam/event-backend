const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000;
require("dotenv").config();
// const mobileRouter = require("./router/router")
const blogRoutes = require("./router/blogRoutes");
const govtRouter = require("./router/GovtRouter");
const contactRoutes = require("./router/ContactRouter");
const subscriberRouter = require("./router/subscriberRouter");

app.use(express.json())
app.use(cors())


// const mongoose =  require("mongoose")
// mongoose.connect("mongodb://localhost:27017")
// .then(()=> console.log("Connected successfully "))
// .catch((err)=> console.log(err.message)
// )

let isConnected = false;
async function connectToMongoDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI),{
            useNewUrlParser: true,
            useUnifiedTopology:true
        }
        isConnected = true;
        console.log("Connected to MongoDB")
    } catch (error){
        console.log("Error connecting to MongoDB:", error)
    }
}


app.use((req, res,next)=>{
    if(!isConnected){
        connectToMongoDB();
    }
    next();
})




// app.use("/api",mobileRouter)
app.use("/api", blogRoutes);

app.use("/api-govt", govtRouter);
app.use("/api", contactRoutes);
app.use("/api", subscriberRouter);


// app.listen(port, ()=>{
//     console.log(`Server is running on port ${port}`)
// })
module.exports = app






