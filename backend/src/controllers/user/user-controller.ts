import User from "../../models/user-model";
import { Request, Response, NextFunction } from "express";
import UserPreference from "../../models/user-preference";
import { getObjectSignedUrl, uploadFile } from "../../utils/image-uploader";

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { userId } = req.body;
  const { profileData } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { ...profileData },
    { new: true }
  );
  return res
    .status(200)
    .json({ message: "Profile updated", data: updatedUser });
};

export const updatePreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { userId } = req.body;
  const { preferences } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedUserPreference = await UserPreference.findOneAndUpdate(
    { user_id: userId },
    { ...preferences },
    { new: true }
  );
  return res
    .status(200)
    .json({ message: "Preferences updated", data: updatedUserPreference });
};

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file Uploaded." });
  }
  const fileName = `images/${file.originalname}`;

  const response = await uploadFile({
    fileBuffer: file.buffer,
    fileName: fileName,
    mimetype: file.mimetype,
  });

  console.log("response", response);
  // const url = await getObjectSignedUrl(`images/${file.originalname}`);
  return res
    .status(200)
    .json({ data: fileName, message: "image upload successfully." });

  // return res.status(200).json({ message: "image upload successfully." });
};
