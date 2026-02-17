import mongoose from "mongoose";
import Category from "../models/Category.js";
import slugify from "slugify";

export const Fetch = async (req, res) => {
  try {
    const filter = {};
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === "true";
    }

    if (req.query.showInHome !== undefined) {
      filter.showInHome = req.query.showInHome === "true";
    }

    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    
    const query = Category.find(filter).populate('parentId', 'name').sort({createdAt: 1})
    if(Number.isInteger(page) && Number.isInteger(limit)){
      const skip = (page - 1) * limit;
      query.skip(skip).limit(limit)
    }
    
    const categories = await query.lean()
    const total = await Category.countDocuments(filter);
    return res.status(200).json({ data: {categories, total, totalPages: limit ? Math.ceil(total / limit) : 1} });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const Create = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file)
    const { name, parentId } = req.body;
    if (!name || name.trim().length < 3) {
      return res.status(400).json({ message: "Invalid category name" });
    }

    if (parentId && !mongoose.Types.ObjectId.isValid(parentId)) {
      return res.status(400).json({ message: "Invalid category Id" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await Category.findOne({ slug });
    if (exists)
      return res.status(409).json({ message: "Category already exists" });

    const category = await Category.create({
      name, 
      slug,
      image: req.file ? req.file?.filename : null,
      parentId: parentId || null,
    });

    return res.status(201).json({ message: "Category created", category });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate category slug" });
    }
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentId, isActive, showInHome } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category Id" });
    }

    const update = {};

    if (name && name.trim().length >= 3) {
      update.name = name;
      update.slug = slugify(name, { lower: true, strict: true });
    }

    if (parentId !== undefined) {
      if (parentId && !mongoose.Types.ObjectId.isValid(parentId)) {
        return res.status(400).json({ message: "Invalid parent Id" });
      }
      update.parentId = parentId || null;
    }

    if (typeof isActive === "boolean") {
      update.isActive = isActive;
    }

    if (typeof showInHome === "boolean") {
      update.showInHome = showInHome;
    }

    if (req.file) {
      update.image = req.file?.filename || null;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });

    return res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const hasChildren = await Category.exists({ parentId: id });
    if (hasChildren)
      return res
        .status(400)
        .json({ message: "Cannot delete category with subcategories" });

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
};
