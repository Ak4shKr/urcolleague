import mongoose, { Schema } from "mongoose";

const PropertySchema: Schema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  rent_amount: {
    type: Number,
    required: true,
  },
  space_available: {
    type: String,
    enum: ["Single", "Shared", "Entire Flat"],
    required: true,
  },
  furnishing: {
    type: String,
    enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
    required: true,
  },
  availability_date: {
    type: Date,
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  square_feet: {
    type: Number,
  },
  amenities: {
    type: [String],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model("Property", PropertySchema);
export default Property;
