import mongoose from 'mongoose';
const Quote = mongoose.model("Quote")
const User = mongoose.model("User")


const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        quotes: async () => {
            return await Quote.find({}).populate("by","_id firstName")
        },
        user: async (_, { _id }) => {
            return await User.findById(_id);
        },
        quote: async (_, { by }) => {
            return await Quote.find({ by });
        }
    },
    User: {
        quotes: async (us) => await Quote.find({ by: us._id })
    },
    Mutation: {
        async createQuote(_, { name }, { userId }) {
            if (!userId) throw new Error("You must be logged in")
            const newQuote = new Quote({
                name,
                by: userId
            })
            await newQuote.save()
            return "Quote saved successfully"
        }
    }
}



export default resolvers;