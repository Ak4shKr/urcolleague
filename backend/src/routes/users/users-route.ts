import express from "express";
import { asyncHandler } from "../../utils/async-handler";
import {
  updatePreferences,
  updateProfile,
} from "../../controllers/user/user-controller";
import { authMiddleware } from "../../middleware/auth/auth-middleware";
const router = express.Router();

router.put("/update-profile", authMiddleware, asyncHandler(updateProfile));
router.put(
  "/update-preferences",
  authMiddleware,
  asyncHandler(updatePreferences)
);
// router.put("/update-password", updatePassword);
// router.get("/matched-properties", getMatchedProperties);
// router.get("/my-properties", getMyProperties);
// router.get("/saved-properties", getMySavedProperties);
// router.get("/property-details/:id", getPropertyDetails);

export default router;
