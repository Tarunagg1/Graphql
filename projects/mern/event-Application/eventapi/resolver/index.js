import eventModel from "../models/event.js";
import userModel from "../models/user.js";
import bookingModel from "../models/booking.js";

import bcryptjs from "bcryptjs";

const root = {
  events: async () => {
    return await eventModel.find({}).populate("creator");
  },
  createEvent: async (args) => {
    const { title, description, price, creator } = args.EventInput;
    const newEvennt = new eventModel({
      title,
      description,
      price,
      creator,
      date: new Date(),
    });
    const isUserExist = await userModel.findById(creator);
    if (isUserExist) {
      const res = await newEvennt.save();
      isUserExist.createEvents.push(res._id);
      await isUserExist.save();
      return res;
    } else {
      throw new Error(`Creator not exists`);
    }
  },

  createUser: async (args) => {
    try {
      const { name, password, email } = args.userInput;
      const isUserExist = await userModel.findOne({ email });
      if (isUserExist) {
        throw new Error(`User emaill allredy exists`);
      } else {
        let hashpassword = await bcryptjs.hash(password, 12);
        const newUser = new userModel({
          name,
          password: hashpassword,
          email,
        });
        const res = await newUser.save();
        return res;
      }
    } catch (error) {
      throw error;
    }
  },

  bookingEvent: async (args) => {
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
  bookings: async () => {
    return await bookingModel.find({}).populate("creator");
  },
};

export default root;
