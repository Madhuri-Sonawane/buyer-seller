import Seller from "../models/sellerModel.js";
import nodemailer from "nodemailer";

export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, shopName, shopAddress, city, pincode } = req.body;

    // 🔹 Duplicate email check
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "⚠️ This email is already registered!" });
    }

    // 🔹 Save new seller
    const newSeller = new Seller(req.body);
    await newSeller.save();

    // 🔹 Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔹 Email to Seller
    const sellerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Seller Registration Successful",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your seller registration is successful.</p>
        <h3>Details:</h3>
        <ul>
          <li><b>Shop Name:</b> ${shopName}</li>
          <li><b>Address:</b> ${shopAddress}</li>
          <li><b>City:</b> ${city}</li>
          <li><b>Pincode:</b> ${pincode}</li>
        </ul>
        <p>Thank you for joining us! We'll contact you soon.</p>
      `,
    };

    // 🔹 Email to Admin (you)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📦 New Seller Registered - ${name}`,
      html: `
        <h3>New Seller Registration Details:</h3>
        <ul>
          <li><b>Name:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Phone:</b> ${phone}</li>
          <li><b>Shop Name:</b> ${shopName}</li>
          <li><b>Address:</b> ${shopAddress}</li>
          <li><b>City:</b> ${city}</li>
          <li><b>Pincode:</b> ${pincode}</li>
        </ul>
      `,
    };

    // 🔹 Send both emails parallelly
    await Promise.all([
      transporter.sendMail(sellerMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    console.log("📧 Seller emails sent successfully!");
    return res.status(201).json({ message: "Seller Registered Successfully ✅" });
  } catch (error) {
    console.error("Seller Register Error:", error);
    return res.status(500).json({
      message: "Seller Registration Failed ❌",
      error: error.message,
    });
  }
};
