import bcryptjs from "bcryptjs";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

const authResolver = {
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

  login: async ({ email, password }) => {
    try {
      const isUserExist = await userModel.findOne({ email });
      if (!isUserExist) {
        throw new Error(`User not exists`);
      } else {
        const isPasswordCorrect = await bcryptjs.compare(
          password,
          isUserExist.password
        );
        if (isPasswordCorrect) {
          const token = jwt.sign(
            { userId: isUserExist._id, email: isUserExist.email },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          const respp = {
            userid: isUserExist._id,
            token,
            tokenExpire: 1,
          };
          return respp;
        } else {
          throw new Error(`Invalid email password`);
        }
      }
    } catch (error) {
      throw error;
    }
  },
};

export default authResolver;
