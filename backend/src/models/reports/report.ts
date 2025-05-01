import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", ReportSchema);
export default Report;
