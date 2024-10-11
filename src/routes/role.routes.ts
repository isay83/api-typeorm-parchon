import { Router } from "express";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../controllers/role.controllers";

const router = Router();

// Create
router.post("/roles", createRole);
// Get all
router.get("/roles", getRoles);
// Update
router.put("/roles/:id", updateRole);
// Delete
router.delete("/roles/:id", deleteRole);
// Get by id
router.get("/roles/:id", getRole);

export default router;
