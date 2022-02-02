import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
  },
});

const schemaModel = mongoose.model("event", eventSchema);
export default schemaModel;
