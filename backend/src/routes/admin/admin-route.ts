import express from "express";
import { asyncHandler } from "../../utils/async-handler";
import { allUsers } from "../../controllers/admin/users/users-admin";
import {
  adminRole,
  authMiddleware,
} from "../../middleware/auth/auth-middleware";

const router = express.Router();

router.get("/all-users", [authMiddleware, adminRole], asyncHandler(allUsers));

export default router;
