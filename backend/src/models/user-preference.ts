import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  preferred_location: [
    {
      type: String,
    },
  ],
  preferred_profession: [
    {
      type: String,
    },
  ],
  preferred_religion: [
    {
      type: String,
    },
  ],
  preferred_age_min: {
    type: Number,
  },
  preferred_age_max: {
    type: Number,
  },
  smoking_preference: {
    type: String,
    enum: ["yes", "no", "no issue"],
  },
  drinking_preference: {
    type: String,
    enum: ["yes", "no", "no issue"],
  },
  food_preference: {
    type: String,
    enum: ["veg", "non-veg", "no issue"],
  },
  pets_preference: {
    type: String,
    enum: ["yes", "no", "no issue"],
  },
  preferred_gender: {
    type: String,
    enum: ["female", "male", "other"],
  },
});

const UserPreference = mongoose.model("UserPreference", PreferenceSchema);
export default UserPreference;
