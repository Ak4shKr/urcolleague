import express from "express";
import { asyncHandler } from "../../utils/async-handler";
import { updateProfile } from "../../controllers/user/user-controller";
const router = express.Router();

router.put("/update-profile", asyncHandler(updateProfile));
// router.put("/update-preferences", updatePreferences);
// router.put("/update-password", updatePassword);
// router.get("/matched-properties", getMatchedProperties);
// router.get("/my-properties", getMyProperties);
// router.get("/saved-properties", getMySavedProperties);
// router.get("/property-details/:id", getPropertyDetails);

export default router;
