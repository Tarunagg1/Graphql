import { users, quotes } from '../fakedb.js';

const resolvers = {
    Query: {
        greet: () => {
            return "hello world";
        },
        users: () => {
            return users
        },
        quotes: () => quotes,
        user: (_, args) => {
            return users.find(user => user._id == args.id)
        },
        quote: (_, args) => {
            return quotes.find(quote => quote.by == args.by)
        }
    },
    User: {
        quotes: (us) => quotes.filter((ele) => ele.by == us._id)
    }
}



export default resolvers;