import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from "./user.resolvers/user.resolvers.js";

const resolvers = mergeResolvers([userResolvers])

export default resolvers;