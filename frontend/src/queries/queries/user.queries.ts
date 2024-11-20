import { gql } from "@apollo/client"

export const GET_USER_QUERY = gql`
    query AuthUser {
        authUser {
            _id
            username
            email
            dob
            phone
        }
    }
`