import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  shopName: { type: String, required: true },
  propertyAddress: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
});

export default mongoose.model("Seller", sellerSchema);
