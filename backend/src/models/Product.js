import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    images: {
      type: String,
    },
    minQty: {
      type: String,
      trim: true,
      required: true,
    },
    bagSize: {
      type: String,
      trim: true,
      required: true,
    },
    bagType: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["vegetarian", "non-vegetarian"],
      required: true,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Product = model("Product", productSchema);
export default Product;
