import dotenv from 'dotenv';
dotenv.config()
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core';
import { ApolloServer } from "apollo-server-express"

import jwt from 'jsonwebtoken';
import cors from 'cors';

// server  specific
import express from 'express';
import http from 'http';
import path from 'path';
const __dirname = path.resolve();

const app = express();
const httpServer = http.createServer(app);

import typeDefs from './schemaGql/schemaGql.js';

import './models/User.js';
import './models/Quotes.js';


import resolvers from './resolver/index.js';
import './config/db.js';

const port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}



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
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !== "production" ?
            ApolloServerPluginLandingPageGraphQLPlayground() :
            ApolloServerPluginLandingPageDisabled()
    ]
})


if (process.env.NODE_ENV == "production") {
    app.use(express.static('../client/build'))
    app.get("*", (req, res) => {
        console.log(__dirname);
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

await server.start();


server.applyMiddleware({
    app,
    path: '/graphql'
});


httpServer.listen({ port }, () => {
    console.log(`🚀  Server ready at 4000 ${server.graphqlPath}`);
})





