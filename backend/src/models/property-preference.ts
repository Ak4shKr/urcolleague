import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
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
  gender_preference: {
    type: String,
    enum: ["female", "male", "other"],
  },
  religion_preference: {
    type: String,
  },
});

const PropertyPreference = mongoose.model(
  "PropertyPreference",
  PreferenceSchema
);
export default PropertyPreference;
