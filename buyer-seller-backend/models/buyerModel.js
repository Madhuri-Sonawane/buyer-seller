import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  street2: { type: String },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  preferredLocation: { type: String },
  maxBudget: { type: String },
  interestedIn: { type: String },
  bedrooms: { type: String },
  comments: { type: String },
});

export default mongoose.model("Buyer", buyerSchema);
