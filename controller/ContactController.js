const Contact = require("../model/contactModel");

const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({name,email,subject,message});

    // Save in MongoDB
    const savedContact = await contact.save(); 
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact: savedContact,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  sendContact,
};