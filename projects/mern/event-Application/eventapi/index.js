import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { graphqlHTTP } from "express-graphql";
import connectDB from "./config/db.js";
import validateToken from './middleware/validateToken.js';
import root from "./resolver/index.js";

import schema from "./schema/index.js";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method === "OPTIONS"){
    return res.sendStatus(200);
  }
  next();
})

const PORT = process.env.PORT || 4000;

app.use(validateToken)

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root
  })
);

app.listen(PORT, function () {
  console.log("express listening on port " + PORT);
});
