import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { graphqlHTTP } from "express-graphql";
import connectDB from "./config/db.js";
import root from "./resolver/index.js";

import schema from "./schema/index.js";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root,
  })
);

app.listen(PORT, function () {
  console.log("express listening on port " + PORT);
});
