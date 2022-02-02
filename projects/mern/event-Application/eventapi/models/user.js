import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  createEvents: [
    {
      type: mongoose.Types.ObjectId,
      ref: "event",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
