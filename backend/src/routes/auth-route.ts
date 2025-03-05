import express from "express";
import { userLogin, userRegister } from "../controllers/auth-controller";
import { asyncHandler } from "../utils/async-handler";
const router = express.Router();

router.post("/register", asyncHandler(userRegister));
router.post("/login", asyncHandler(userLogin));

export default router;
