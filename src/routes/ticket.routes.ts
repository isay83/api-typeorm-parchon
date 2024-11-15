import { Router } from "express";
import { createTicket, getTicket, updateTicket, deleteTicket, getTickets, getTicketTier } from "../controllers/ticket.controllers";

const router = Router();

// Create
router.post("/tickets", createTicket);
// Get all
router.get("/tickets", getTickets);
// Update
router.put("/tickets/:id", updateTicket);
// Delete
router.delete("/tickets/:id", deleteTicket);
// Get by id
router.get("/tickets/:id", getTicket);
// With Tier
router.get("/tickets/tiers/:id", getTicketTier);

export default router;
