import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Category name is required"],
  },
  slug: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null 
  },
  isActive: {
    type: Boolean,
    default: true
  }
},{timestamps: true});

const Category = model('Category', categorySchema)
export default Category;
