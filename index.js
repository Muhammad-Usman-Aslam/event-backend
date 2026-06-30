const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

// =======================
// Routes
// =======================
const blogRoutes = require("./router/blogRoutes");
const govtRouter = require("./router/GovtRouter");
const contactRoutes = require("./router/ContactRouter");
const subscriberRouter = require("./router/subscriberRouter");

// =======================
// MongoDB Connection
// =======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");

    console.log("Connection State:", mongoose.connection.readyState);
    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting

  } catch (error) {
    console.error("❌ MongoDB Connection Error");
    console.error(error);
    process.exit(1);
  }
};

// Connect Database
connectDB();

// =======================
// Routes
// =======================
app.use("/api", blogRoutes);
app.use("/api-govt", govtRouter);
app.use("/api", contactRoutes);
app.use("/api", subscriberRouter);

// =======================
// Home Route
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running Successfully"
  });
});

// =======================
// Local Server
// =======================
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 5000;

//   app.listen(PORT, () => {
//     console.log(`🚀 Server Running on Port ${PORT}`);
//   });
// }

// =======================
// Export for Vercel
// =======================
module.exports = app;