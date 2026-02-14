import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },
    image: {
      type: String,
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

const Category = model("Category", categorySchema);
export default Category;
