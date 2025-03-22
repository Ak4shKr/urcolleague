import express from "express";

import { asyncHandler } from "../../utils/async-handler";
import {
  updatePreferences,
  updateProfile,
  uploadImage,
  uploadProperty,
} from "../../controllers/user/user-controller";
import { authMiddleware } from "../../middleware/auth/auth-middleware";
import { upload } from "../../utils/image-uploader";
const router = express.Router();

router.put("/update-profile", authMiddleware, asyncHandler(updateProfile));
router.put(
  "/update-preferences",
  authMiddleware,
  asyncHandler(updatePreferences)
);
router.post("/upload-image", upload.single("file"), asyncHandler(uploadImage));

// router.put("/update-password", updatePassword);
// router.get("/matched-properties", getMatchedProperties);
// router.get("/my-properties", getMyProperties);
// router.get("/saved-properties", getMySavedProperties);
// router.get("/property-details/:id", getPropertyDetails);

router.post("/property-upload", authMiddleware, asyncHandler(uploadProperty));


export default router;
