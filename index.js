const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Routes
const blogRoutes = require("./router/blogRoutes");
const govtRouter = require("./router/GovtRouter");
const contactRoutes = require("./router/ContactRouter");
const subscriberRouter = require("./router/subscriberRouter");

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/api", blogRoutes);
app.use("/api-govt", govtRouter);
app.use("/api", contactRoutes);
app.use("/api", subscriberRouter);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend is Running...");
});

module.exports = app;

// Run locally only
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 5000;

//   app.listen(PORT, () => {
//     console.log(`Server Running on Port ${PORT}`);
//   });
// }