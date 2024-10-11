import { Router } from "express";
import { createCategory, deleteCategory, getCategory, getCategories, updateCategory } from "../controllers/category.controllers";

const router = Router();

// Create
router.post("/categories", createCategory);
// Get all
router.get("/categories", getCategories);
// Update
router.put("/categories/:id", updateCategory);
// Delete
router.delete("/categories/:id", deleteCategory);
// Get by id
router.get("/categories/:id", getCategory);

export default router;
