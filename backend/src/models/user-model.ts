import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    requied: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  aadharNumber: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  documentImage: {
    type: String,
    required: true,
  },
  preferences: {
    occupation: String,
    profession: { type: mongoose.Schema.Types.ObjectId, ref: "Profession" },
    religion: { type: mongoose.Schema.Types.ObjectId, ref: "Religion" },
    smoking: Boolean,
    drinking: Boolean,
    petFriendly: Boolean,
    hasPets: Boolean,
    preferredGender: { type: String, enum: ["Male", "Female", "Any"] },
    budget: Number,
    location: String,
    preferredLocation: String,
    language: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
