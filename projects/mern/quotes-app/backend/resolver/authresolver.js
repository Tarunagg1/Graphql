import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const User = mongoose.model("User")
const Quote = mongoose.model("Quote")

const resolvers = {
    Mutation: {
        async signUpUser(_, { userNew }) {
            const user = await User.findOne({ email: userNew.email })
            if (user) {
                throw new Error("User already exists with that email")
            }
            const hashedPassword = await bcrypt.hash(userNew.password, 12)

            const newUser = new User({
                ...userNew,
                password: hashedPassword
            })
            return await newUser.save()
        },

        signinUser: async (_, { userSignin }) => {
            const user = await User.findOne({ email: userSignin.email })
            if (!user) {
                throw new Error("User dosent exists with that email")
            }
            const doMatch = await bcrypt.compare(userSignin.password, user.password)
            if (!doMatch) {
                throw new Error("email or password in invalid")
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            return { token }
        },
    }
}

export default resolvers;