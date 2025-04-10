import express from "express";
import {
  forgotPassword,
  setNewPassword,
  updatePassword,
  userLogin,
  userRegister,
  verifyOTP,
} from "../../controllers/auths/auth-controller";
import { asyncHandler } from "../../utils/async-handler";
const router = express.Router();

router.post("/register", asyncHandler(userRegister));
router.post("/login", asyncHandler(userLogin));
router.put("/update-password", asyncHandler(updatePassword));
router.put("/forgot-password", asyncHandler(forgotPassword));
router.put("/verify-otp", asyncHandler(verifyOTP));
router.put("/set-password", asyncHandler(setNewPassword));

router.post("/google/auth", asyncHandler(googleAuth));
export default router;
