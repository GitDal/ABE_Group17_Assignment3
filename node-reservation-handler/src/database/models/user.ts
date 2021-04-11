import mongoose, { Document } from "mongoose";

const userModelName = "User";

export interface IUser {
    claims?: Array<string>;
    email: string
    password: string;
}

export interface IUserDoc extends IUser, Document {
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: String,
    claims: [String]
});

export default mongoose.model(userModelName, userSchema);