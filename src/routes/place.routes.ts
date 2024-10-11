import { Router } from "express";
import { createPlace, deletePlace, getPlace, getPlaces, updatePlace } from "../controllers/place.controllers";

const router = Router();

// Create
router.post("/places", createPlace);
// Get all
router.get("/places", getPlaces);
// Update
router.put("/places/:id", updatePlace);
// Delete
router.delete("/places/:id", deletePlace);
// Get by id
router.get("/places/:id", getPlace);

export default router;
