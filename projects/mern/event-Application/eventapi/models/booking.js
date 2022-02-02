import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    eventId: {
      type: mongoose.Types.ObjectId,
      ref: "event",
    }
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("booking", bookingSchema);
export default bookingModel;
