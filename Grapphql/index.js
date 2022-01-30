const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3000;

// Data types
/**
 * Int
 * Float
 * String
 * Id
 * List[]
 * Boolean
 * Own
 */

let message = "This is a old message";

var schema = buildSchema(`
    type Post{
        userId:Int
        id:Int
        title:String
        body:String
    }
  type User {
    age: Int
    name: String
    college:String
  }
  type Query {
    hello:String
    welcomeMessage(name:String,lname:String!):String
    getUser:User
    getUsers:[User]
    getPostsFromApi:[Post]
    message:String
  },

  input userInput{
      name:String
      age:Int!
      college:String!
  }

  type Mutation{
    setMessage(newMessage:String):String
    createUser(user:userInput):User
  }
`);

const root = {
  hello: () => {
    return "hello world";
  },
  welcomeMessage: (args) => {
    return `hey ${args.name} ${args.lname} how are you`;
  },
  getUser: () => {
    const user = {
      age: 10,
      name: "Tarun",
      college: "PDMU",
    };
    return user;
  },
  getUsers: () => {
    const users = [
      {
        age: 10,
        name: "Tarun",
        college: "PDMU",
      },
      {
        age: 10,
        name: "Tarun",
        college: "PDMU",
      },
    ];

    return users;
  },
  getPostsFromApi: async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return result.data;
  },
  setMessage: ({ newMessage }) => {
    message = newMessage;
    return message;
  },
  message: () => {
    return message;
  },
  createUser:(args)=>{
      return args.user;
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root,
  })
);

app.listen(PORT, (req, res) => {
  console.log("Servir listning at ", PORT);
});
