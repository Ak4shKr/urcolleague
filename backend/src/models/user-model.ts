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
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  aadharNumber: {
    type: Number,
  },
  profileImage: {
    type: String,
  },
  documentImage: {
    type: String,
  },
  credit: {
    type: Number,
  },
  googleId: {
    type: String,
  },
  preferences: {
    occupation: String,
    profession: { type: mongoose.Schema.Types.ObjectId, ref: "Profession" },
    religion: {
      type: String,
      enum: [
        "Hindu",
        "Muslim",
        "Sikh",
        "Chiristian",
        "jain",
        "baudh",
        "jewis",
        "atheist",
        "other",
      ],
    },
    smoking: Boolean,
    drinking: Boolean,
    petFriendly: Boolean,
    hasPets: Boolean,
    preferredGender: { type: String, enum: ["Male", "Female", "Any"] },
    budget: Number,
    location: String,
    preferredLocation: String,
    language: String,
    state: String,
    country: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
