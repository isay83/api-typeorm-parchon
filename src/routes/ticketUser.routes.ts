import { Router } from "express";
import { createTicketUser, getTicketUsers, updateTicketUser, deleteTicketUser, getTicketUser } from "../controllers/ticketUser.controllers";

const router = Router();

// Create
router.post("/tickets/users", createTicketUser);
// Get all
router.get("/tickets/users", getTicketUsers);
// Update
router.put("/tickets/users/:id", updateTicketUser);
// Delete
router.delete("/tickets/users/:id", deleteTicketUser);
// Get by id
router.get("/tickets/users/:id", getTicketUser);

export default router;
