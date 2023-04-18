import dotenv from 'dotenv';
dotenv.config()
import { ApolloServer, gql } from 'apollo-server';
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core';

import jwt from 'jsonwebtoken';

import typeDefs from './schemaGql/schemaGql.js';

import './models/User.js';
import './models/Quotes.js';


import resolvers from './resolver/index.js';
import './config/db.js';

const port = process.env.PORT || 4000;

const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        return { userId }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        // ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !== "production" ?
            ApolloServerPluginLandingPageGraphQLPlayground() :
            ApolloServerPluginLandingPageDisabled()
    ]
})


server.listen({ port }, () => {
    console.log(`🚀  Server ready at 4000 ${server.graphqlPath}`);
})




