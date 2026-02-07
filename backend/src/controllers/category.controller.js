import mongoose from "mongoose";
import Category from "../models/Category.js";
import slugify from "slugify";

export const Fetch = async (req, res) => {
  try {
    const category = await Category.find();
    if (category.length <= 0)
      return res.status(404).json({ message: "no category found" });

    return res.status(200).json({ category });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const Create = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    const slug = slugify(name, { lower: true });

    const category = await Category.create({
      name,
      slug,
      parentId: parentId ? parentId : null,
    });

    return res.status(201).json({ message: "Category is created", category });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const Update = async (req, res) => {
  try {
    const {id} = req.params
    const {name, parentId} = req.body
    const category = await Category.findOne({id})
    if(!category) return res.status(404).json({message: "Category is not found"})
   
    const updatedCategory =  await Category.findByIdAndUpdate({name, slug, parentId}, {new: true})  
      
    return res.status(200).json({message: "Category updated successfully", updatedCategory})
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const Delete = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
};
