import express from "express";
import { asyncHandler } from "../../utils/async-handler";
import { authMiddleware } from "../../middleware/auth/auth-middleware";
import { upload } from "../../utils/image-uploader";
import {
  updatePreferences,
  updateProfile,
  uploadImage,
  uploadProperty,
} from "../../controllers/user/user-controller";

const router = express.Router();

router.put("/update-profile", authMiddleware, asyncHandler(updateProfile));
router.put(
  "/update-preferences",
  authMiddleware,
  asyncHandler(updatePreferences)
);

router.post("/upload-image", upload.single("file"), asyncHandler(uploadImage));
router.post("/property-upload", authMiddleware, asyncHandler(uploadProperty));
// router.get("/my-properties", getMyProperties);
// router.get("/saved-properties", getMySavedProperties);
// router.get("/property-details/:id", getPropertyDetails);
// router.get("/matched-properties", getMatchedProperties);


export default router;
