import { gql } from '@apollo/client'


export const SIGNUP_USER = gql`
    mutation createuser($newuser:userInput!){
        user:signUpUser(userNew:$newuser){
            firstName
        }
    }
`;


export const LOGIN_USER = gql`
    mutation signInuser($userSigninn:signInUser!){
        user:signinUser(userSignin:$userSigninn){
            token
        }
    }
`


export const CREATE_QUOTE = gql`
  mutation createQuote($name:String!){
    quote:createQuote(name:$name)
  }
`