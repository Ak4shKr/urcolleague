import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { allUsers } from "../controllers/admin/users/users-admin";
import { authMiddleware } from "../middleware/auth/auth-middleware";

const router = express.Router();

router.get("/all-users", authMiddleware, asyncHandler(allUsers));

export default router;
