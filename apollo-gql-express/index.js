const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolver");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const mongoose = require("mongoose");

async function startServer() {
  try {
    const app = express();

    const PORT = process.env.PORT || 4000;

    const apoolloserver = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apoolloserver.start();
    apoolloserver.applyMiddleware({ app: app });

    app.use((req, res) => {
      return res.send("hello from apllo server");
    });

    await mongoose.connect("mongodb://localhost:27017/graphql").then(() => {
      console.log("mongoose connected successfully");
    });

    app.listen(PORT, function () {
      console.log("Server listening on port " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
