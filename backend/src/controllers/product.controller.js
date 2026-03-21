import Category from "../models/Category.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import slugify from "slugify";

export const Fetch = async (req, res) => {
  try {
    const products = await Product.find().lean().populate('category', 'name');
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const FetchById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({ message: "Invalid Product ID" });
    const product = await Product.findById(id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const FetchBySlug = async (req, res) => {
  try {
    const {slug} = req.params
    if(!slug) return res.status(400).json({message: 'Slug is required'})

    const product = await Product.findOne({
      slug: slug.trim().toLowerCase()
    })
    .select("-__v")
    .lean();
    
    if(!product) return res.status(404).json({message: 'Product not found'})
    return res.status(200).json({product})  
  } catch (error) {
     res.status(500).json({message: error.message})    
  }
}

export const Create = async (req, res) => {
  try {
    const { name, category, slug, shortDescription, isActive, showInHome } = req.body;
    req.file;
    if (!name || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (name.trim().length < 3) return res.status(400).json({ message: "Product name is invalid" });

    if (!mongoose.Types.ObjectId.isValid(category)) return res.status(400).json({ message: "Category is invalid" });

    const isCategory = await Category.findById(category);
    if (!isCategory) return res.status(404).json({ message: "Category not found" });

    const image = req.file ? req.file?.filename : null;

    const product = await Product.create({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      category,
      image,
      shortDescription,
      isActive,
      showInHome,
    });

    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Duplicate product slug" });
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, slug, shortDescription, isActive, showInHome } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product ID" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const update = {};
    if (name) {
      if (name.trim().length < 3) return res.status(400).json({ message: "Product name is invalid" });
      update.name = name;
    }
    if (slug !== undefined && slug !== "") {
      update.slug = slugify(slug, { lower: true, strict: true });
    } else if (name) {
      update.slug = slugify(name, { lower: true, strict: true });
    }
    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) return res.status(400).json({ message: "Category is invalid" });

      const isCategory = await Category.findById(category);
      if (!isCategory) return res.status(404).json({ message: "Category not found" });
      update.category = category;
    }

    if(req.file){
      update.image = req.file ? req.file?.filename : null;
    }

    if (isActive) update.isActive = isActive;
    if (showInHome) update.showInHome = showInHome;
    if (shortDescription) update.shortDescription = shortDescription;

    if (Object.keys(update).length === 0) return res.status(400).json({ message: "Nothing to update" });
    const updatedProduct = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });
    return res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product ID" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const deleted = await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Porduct deleted successfully", deleted });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
