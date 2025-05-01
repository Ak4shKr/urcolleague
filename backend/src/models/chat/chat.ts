import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
