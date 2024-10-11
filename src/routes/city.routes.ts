import { Router } from "express";
import { createCity, deleteCity, getCity, getCities, updateCity } from "../controllers/city.controllers";

const router = Router();

// Create
router.post("/cities", createCity);
// Get all
router.get("/cities", getCities);
// Update
router.put("/cities/:id", updateCity);
// Delete
router.delete("/cities/:id", deleteCity);
// Get by id
router.get("/cities/:id", getCity);

export default router;
