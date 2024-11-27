import { Router } from "express";
import { createImage, deleteImage, getImage, getImages, getImagesFullData, updateImage } from "../controllers/image.controllers";
import { upload } from "../config/multer";

const router = Router();
// Create
router.post("/images", upload.single("image"), createImage);
// Get all
router.get("/images", getImages);
// get all full
router.get("/images-full", getImagesFullData);
// Update
router.put("/images/:id", updateImage);
// Delete
router.delete("/images/:id", deleteImage);
// Get by id
router.get("/images/:id", getImage);

export default router;
