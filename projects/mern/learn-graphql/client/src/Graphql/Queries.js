import { gql } from '@apollo/client';





export const LOADS_USERS = gql`
        query{
            getAllUsers{
            name,
            age,
            married
            }
        }
`;










