import mongoose from "mongoose";

const SavedPropertySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const SavedProperty = mongoose.model("SavedProperty", SavedPropertySchema);
export default SavedProperty;
