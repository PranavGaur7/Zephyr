import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v: string): boolean {
                // Ensure phone number is exactly 10 digits
                return /^[0-9]{10}$/.test(v);
            },
            message: (props: { value: string }) =>
                `Phone number must be exactly 10 digits, but got ${props.value}`,
        },
    }
})

const userModel = mongoose.model("userModel", userSchema)
export default userModel