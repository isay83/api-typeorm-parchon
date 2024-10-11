import { Router } from "express";
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controllers/event.controllers";

const router = Router();

// Create
router.post("/events", createEvent);
// Get all
router.get("/events", getEvents);
// Update
router.put("/events/:id", updateEvent);
// Delete
router.delete("/events/:id", deleteEvent);
// Get by id
router.get("/events/:id", getEvent);

export default router;
