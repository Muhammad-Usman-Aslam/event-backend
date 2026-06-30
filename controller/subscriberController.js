const Subscriber = require("../model/subscriberModel");

exports.subscribe = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    const exists = await Subscriber.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Already subscribed",
      });
    }

    const subscriber = await Subscriber.create({
      email,
    });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      subscriber,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Already subscribed",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};
