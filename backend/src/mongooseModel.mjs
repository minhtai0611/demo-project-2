import { Schema, model } from "mongoose";
const { Types } = Schema;
const { ObjectId } = Types;

export const User = model("User", new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
));

export const Token = model("Token", new Schema(
    {
        token: {
            type: String,
            require: true,
        },
        expireDate: {
            type: Date,
            require: true,
        },
        userid: {
            type: ObjectId,
            ref: "User"
        },
        username: {
            type: String,
        }
    },
    { timestamps: true }
));