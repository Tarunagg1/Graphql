import { gql } from 'apollo-server';


const typeDefs = gql`
    type Query{
        greet:String,
        user(id:ID!):User,
        users:[User],
        quotes:[Quote],
        quote(by:ID!):Quote,
    }

    type User{
        _id:ID
        firstName:String
        lastName:String
        email:String,
        quotes:[Quote]
    }

    type Quote{
        name:String
        by:ID
    }
    input userInput{
        firstName:String!,
        lastName:String!,
        email:String!,
        password:String!
    }

    input signInUser{
        email:String!,
        password:String!
    }

    type Token{
        token:String!
    }

    type Mutation{
        signUpUser(userNew:userInput):User,
        signinUser(userSignin:signInUser):Token
    }
`;


export default typeDefs;