import { Schema, model } from "mongoose";

const enquirySchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Buyer", "Supplier"],
      required: true,
    },
    fullname: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"],
      required: [true, "Email is required"],
    },
    phone: {
      type: Number,
      trim: true,
      required: [true, "Phone number is required"],
    },
    countryCode: {
      type: String,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    commodity: {
      type: String,
      trim: true,
      required: true,
    },
    subCommodity: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

const Enquiry = model('Enquiry', enquirySchema)
export default Enquiry;