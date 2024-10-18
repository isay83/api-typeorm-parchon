import { Router } from "express";
import { createUser, deleteUser, getCookieExists, getUser, getUserByCookie, getUsers, loginUser, updateUser } from "../controllers/user.controllers";

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
// Get by cookie
router.get("/users/coo", getUserByCookie);
// Get Cookie
router.get("/cookie", getCookieExists);
export default router;
