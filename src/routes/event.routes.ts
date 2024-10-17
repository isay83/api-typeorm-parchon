import { Router } from "express";
import { createEvent, deleteEvent, getEvent, getEvents, getEventCard, getEventDetails, updateEvent } from "../controllers/event.controllers";

const router = Router();

// Create
router.post("/events", createEvent);
// Get all
router.get("/events", getEvents);
// Get Event Card data
router.get("/events/cards", getEventCard)
// Update
router.put("/events/:id", updateEvent);
// Delete
router.delete("/events/:id", deleteEvent);
// Get by id
router.get("/events/:id", getEvent);
// Get Event Details by id
router.get("/events/details/:id", getEventDetails)

export default router;
