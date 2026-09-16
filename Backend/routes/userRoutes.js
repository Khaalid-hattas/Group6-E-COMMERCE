import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../../middelware/authMiddleware.js";

const router = Router();

router.get("/me", authMiddleware, getUserProfile);
router.put("/me", authMiddleware, updateUserProfile);

export default router;
