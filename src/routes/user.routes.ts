import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser } from "../controllers/user.controllers";

const router = Router();

// Create
router.post("/users", createUser);
// Login
router.post("/login", loginUser);
// Get all
router.get("/users", getUsers);
// Update
router.put("/users/:id", updateUser);
// Delete
router.delete("/users/:id", deleteUser);
// Get by id
router.get("/users/:id", getUser);

export default router;
