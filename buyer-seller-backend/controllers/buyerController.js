import Buyer from "../models/buyerModel.js";
import nodemailer from "nodemailer";

export const registerBuyer = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if email already registered
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: "⚠️ This email is already registered!" });
    }

    // Save new buyer
    const newBuyer = new Buyer(req.body);
    await newBuyer.save();

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to buyer
    const buyerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Buyer Registration Successful",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for registering with us! Here are your details:</p>
        <ul>
          <li><b>Name:</b> ${req.body.name}</li>
          <li><b>Phone:</b> ${req.body.phone}</li>
          <li><b>City:</b> ${req.body.city}</li>
          <li><b>Preferred Location:</b> ${req.body.preferredLocation || "N/A"}</li>
        </ul>
        <p>We’ll contact you soon regarding your requirements.</p>
        <p>— The Real Estate Team 🏡</p>
      `,
    };

    // Email to admin (you)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📩 New Buyer Registration - ${name}`,
      html: `
        <h3>New Buyer Registered!</h3>
        <ul>
          <li><b>Name:</b> ${req.body.name}</li>
          <li><b>Email:</b> ${req.body.email}</li>
          <li><b>Phone:</b> ${req.body.phone}</li>
          <li><b>City:</b> ${req.body.city}</li>
          <li><b>Preferred Location:</b> ${req.body.preferredLocation || "N/A"}</li>
        </ul>
      `,
    };

    // Send both emails parallelly
    await Promise.all([
      transporter.sendMail(buyerMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    console.log("📧 Emails sent successfully!");
    return res.status(201).json({ message: "Buyer Registered Successfully ✅" });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Registration Failed ❌", error: error.message });
  }
};
