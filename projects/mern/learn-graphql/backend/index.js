const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require('./schema/TypeDefs');
const resolvers = require('./schema/Resolver');
const {
    ApolloServerPluginLandingPageGraphQLPlayground,
  } = require("apollo-server-core");
const app = express();


async function startServer() {

    const apoolloserver = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apoolloserver.start();
    apoolloserver.applyMiddleware({ app });
    
    const port = 4000;
    
    app.listen(port, () => {
        console.log('server listening on port ' + port);
    })
};

startServer();

