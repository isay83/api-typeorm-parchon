import { Router } from "express";
import { createTier, getTiers, updateTier, deleteTier, getTier } from "../controllers/tier.controllers";

const router = Router();

// Create
router.post("/tickets", createTier);
// Get all
router.get("/tickets", getTiers);
// Update
router.put("/tickets/:id", updateTier);
// Delete
router.delete("/tickets/:id", deleteTier);
// Get by id
router.get("/tickets/:id", getTier);

export default router;
