import quotesResolver from './resolvers.js';
import authResolver from './authresolver.js';

export default {
    Query: {
        ...quotesResolver.Query,
    },
    User: {
        ...quotesResolver.User,
    },
    Mutation: {
        ...authResolver.Mutation,
    }
}
