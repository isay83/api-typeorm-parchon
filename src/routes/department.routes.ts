import { Router } from "express";
import { createDepartment, deleteDepartment, getDepartment, getDepartments, updateDepartment } from "../controllers/department.controllers";

const router = Router();

// Create
router.post("/departments", createDepartment);
// Get all
router.get("/departments", getDepartments);
// Update
router.put("/departments/:id", updateDepartment);
// Delete
router.delete("/departments/:id", deleteDepartment);
// Get by id
router.get("/departments/:id", getDepartment);

export default router;
