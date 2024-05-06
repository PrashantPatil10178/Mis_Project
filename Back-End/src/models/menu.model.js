import mongoose from "mongoose";

const { Schema, model } = mongoose;

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Assuming the image will be stored as a URL
    required: true,
  },
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
