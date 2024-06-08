import { Schema, model } from "mongoose";

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