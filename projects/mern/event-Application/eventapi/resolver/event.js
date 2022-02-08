import eventModel from "../models/event.js";
import userModel from "../models/user.js";

const eventResolver = {
  events: async () => {
    return await eventModel.find({}).populate("creator");
  },
  singleEvent: async (id) => {
    try {
      const event = await eventModel.findById(id);
      return event;
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args,req) => {
    if(!req.isAuth){
      throw new Error("Unauthenticated")
    }
    
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
  }
};

export default eventResolver;
