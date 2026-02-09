import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      index: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      immutable: true,
      index: true,
      required: true
    },
    images: [{
      type: String,
      required: true
    }],
    minQty: {
      type: Number,
      min: 1,
      required: true
    },
    type: {
      type: String,
      enum: ["vegetarian", "non-vegetarian"],
      required: true,
    },
    shortDescription: {
      type: String,
      minlength: 10,
      maxlength: 200
    },
    description: {
      type: String,
      minlength: 50,
      maxlength: 5000
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    showInHome: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

const Product = model("Product", productSchema);
export default Product;
