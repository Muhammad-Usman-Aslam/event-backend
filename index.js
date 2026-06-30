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

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI?.trim();
let isConnected = false;

async function connectToMongoDB() {
    if (isConnected) return;

    if (!MONGO_URI) {
        throw new Error("Missing MONGO_URI environment variable");
    }

    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB Connected Successfully");
}

// Connect before every request (only first request actually connects)
app.use(async (req, res, next) => {
    if (!isConnected) {
        try {
            await connectToMongoDB();
        } catch (error) {
            console.error("❌ MongoDB Connection Error:", error);
            return res.status(500).json({
                success: false,
                message: "Database connection failed",
                error: error.message,
            });
        }
    }
    next();
});

// Routes
app.use("/api", blogRoutes);
app.use("/api-govt", govtRouter);
app.use("/api", contactRoutes);
app.use("/api", subscriberRouter);

module.exports = app;