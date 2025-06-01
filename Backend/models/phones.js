import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  imei: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  warrantyExpiry: {
    type: Date,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  expectedSellingPrice: {
    type: Number,
  },
  condition: {
    type: String,
    enum: ["Like New", "Good", "Fair", "Poor"],
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  sellerAadharNumber: {
    type: String,
    required: true,
  },
  sellerAadharImage: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Available", "Sold"],
    default: "Available",
  },
  stock:{
    type:Number,
    default:1
  },
  sold: {
    type: Boolean,
    default: false
},
soldDate: {
    type: Date
},
soldPrice: {
    type: Number
},
buyer: {
    type: String
},
buyerContact: {
    type: String
},
buyerAddress: {
    type: String
},
  notes: {
    type: String,
  },
});

const Phone = mongoose.model("Phone", phoneSchema);

export default Phone;