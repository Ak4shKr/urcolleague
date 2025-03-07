import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  google_id: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  profession: {
    type: String,
  },
  religion: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  aadhar_card: {
    type: String,
  },
  aadhar_card_image: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
