import { Router } from "express";
import { createUser, deleteUser, getCookieExists, getRoleByCookie, getUser, getUserByCookie, getUsers, loginUser, logoutUser, updateUser } from "../controllers/user.controllers";

const router = Router();

// Create
router.post("/users", createUser);
// Login
router.post("/login", loginUser);
// Logout
router.post("/logout", logoutUser);
// Get by cookie
router.post("/users/cookie", getUserByCookie);
// Get Role by Cookie
router.get("/role", getRoleByCookie);
// Get all
router.get("/users", getUsers);
// Get by id
router.get("/users/:id", getUser);
// Get if exists Cookie
router.get("/cookie", getCookieExists);
// Update
router.put("/users/:id", updateUser);
// Delete
router.delete("/users/:id", deleteUser);
export default router;
