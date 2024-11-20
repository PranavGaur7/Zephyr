import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDefs from "./user.typedefs/user.typedefs.js";

const typeDefs = mergeTypeDefs([userTypeDefs])

export default typeDefs 