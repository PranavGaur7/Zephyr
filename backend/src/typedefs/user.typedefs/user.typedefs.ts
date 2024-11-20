const userTypeDefs = `#graphql
    scalar Date
    type User{
        _id:ID!
        username: String!
        email: String!
        password: String!
        dob: Date
        phone: String
    }
    
    type Query{
        authUser: User!
    }

    type Mutation{
        login(input: LoginInput!): Response!
        signup(input: SignupInput!): Response!
    }
    input LoginInput{
        username: String!
        password: String!
    }
    input SignupInput{
        username: String! 
        password: String!
        email:String!
    }

    type Response{
        user:User
        token: String
    }
`

export default userTypeDefs;