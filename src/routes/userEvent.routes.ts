import { Router } from "express";
import { createUserEvent, getUserEvents, updateUserEvent, deleteUserEvent, getUserEvent } from "../controllers/userEvent.controllers";

const router = Router();

// Create
router.post("/users", createUserEvent);
// Get all
router.get("/users", getUserEvents);
// Update
router.put("/users/:id", updateUserEvent);
// Delete
router.delete("/users/:id", deleteUserEvent);
// Get by id
router.get("/users/:id", getUserEvent);

export default router;
