require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const {ApolloServerPluginLandingPageGraphQLPlayground} = require("apollo-server-core");  
const gql = require('graphql-tag');
require('./config//db')();
const resolvers = require('./graphql/resolvers');

const typeDefs = require('./graphql/typeDefs');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});


