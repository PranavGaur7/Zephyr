import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import userModel from "../../models/user.model.js";
interface myContext {
    token?: string;
}
const userResolvers = {
    Query: {
        authUser: async (_: undefined, __: undefined, context: myContext) => {
            try {
                
                const token = context.token;
                console.log(token);
                if (!token) {
                    throw new Error("Please Login");
                }
                const decodedToken = jwt.verify(token, process.env.SECURE_STRING) as { payload: string };
                const uid = decodedToken.payload;
                const user = await userModel.findById(uid);
                if (!user) throw new Error("Please Login");
                return user;
            } catch (error) { 
                console.error("Error fetching user", error) 
                throw new Error(error.message || "internel server error ")
            }
        }
    },
    Mutation: {
        login: async (_: undefined, { input }, context: myContext) => {
            try {
                const { username, password} = input;
                const user = await userModel.findOne({ username });
                if (!user)
                    throw new Error("USER_NOT_FOUND")
                const isEqual = await bcryptjs.compare(password, user.password.toString());
                if (!isEqual)
                    throw new Error("INCORRECT_PASSWORD")
                let token = jwt.sign({ payload: user._id }, process.env.SECURE_STRING);
                return { user, token }
            } catch (error) {
                console.error("error while login", error);
                throw new Error(error.message || "internal server error ");
            }
        },
        signup: async (_: undefined, { input }, context: myContext) => {
            try {
                const { username, password,email} = input;
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, salt);
                const user = await userModel.create({ username, password: hashedPassword,email });
                if (!user)
                    throw new Error("unable to signup")

                let token = jwt.sign({ payload: user._id }, process.env.SECURE_STRING);
                return { user, token }
            } catch (error) {
                console.error("error while signup", error);
                throw new Error(error.message || "internl server error ");
            }
        }
    }
}
export default userResolvers;