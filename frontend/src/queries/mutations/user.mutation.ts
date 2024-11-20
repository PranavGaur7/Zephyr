import { gql } from "@apollo/client"

export const CREATE_USER_MUTAION = gql`
    mutation Mutation($input: SignupInput!) {
        signup(input: $input) {
            user {
                _id
                email
                username
                password
            }
            token
        }
    }
`
export const LOGIN_USER_MUTAION = gql`
    mutation Mutation($input: LoginInput!) {
        login(input: $input) {
            user {
            _id
            username
            email
            }
            token
        }
    }
`