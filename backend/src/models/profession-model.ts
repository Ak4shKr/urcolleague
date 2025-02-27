import mongoose from "mongoose";

const professionschema = new mongoose.Schema({
  profession: {
    type: String,
    unique: true,
  },
});

const Profession = mongoose.model("Profession", professionschema);
export default Profession;
