import eventModel from "../models/event.js";
import userModel from "../models/user.js";
import bookingModel from "../models/booking.js";

const bookingResolver = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const data = await bookingModel
      .find({})
      .populate("userId")
      .populate("eventId");
    return data;
  },

  bookingEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const { userId, eventId } = args.bookingInput;
      const isEventExist = await eventModel.findById(eventId);
      const isUserExist = await userModel.findById(userId);

      if (!isEventExist || !isUserExist) {
        throw new Error("User or event not exixts");
      }

      const newBoookEvent = new bookingModel({
        userId,
        eventId,
      });

      const resp = newBoookEvent.save();
      return resp;
    } catch (error) {
      throw error;
    }
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      const data = await bookingModel
        .findById(args.id)
        .populate("userId")
        .populate("eventId");
      await bookingModel.findByIdAndDelete(args.id);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default bookingResolver;
