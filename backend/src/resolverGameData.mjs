import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;

import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

import { scryptSync, generateKeySync } from "node:crypto";
import validator from "validator";
import { User } from "./mongooseModel.mjs";

export const resolverGameData = {
    fetchGameApp: async function () {
        const response = await fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/");
        const json = await response.json();
        const { applist } = json;
        const { apps } = applist;
        return apps;
    },
    fetchGameData: async function ({ appid }) {
        const response = await fetch(`http://store.steampowered.com/api/appdetails/?appids=${appid}`);
        const json = await response.json();
        const { data } = json[appid];
        data.movies && data.movies.forEach(movie => {
            if (Object.prototype.hasOwnProperty.call(movie.webm, "480")) {
                Object.defineProperty(movie.webm, "_480", Object.getOwnPropertyDescriptor(movie.webm, "480"));
                delete movie.webm["480"];
            }

            if (Object.prototype.hasOwnProperty.call(movie.mp4, "480")) {
                Object.defineProperty(movie.mp4, "_480", Object.getOwnPropertyDescriptor(movie.mp4, "480"));
                delete movie.mp4["480"];
            }
        });
        return data;
    },
    registerUser: async function ({ userInput }) {
        const existingUser = await User.findOne({ username: userInput.username });
        if (existingUser) {
            throw new Error("Username you enter has already existed");
        }
        if (validator.matches(userInput.username, /\s/g) || validator.matches(userInput.password, /\s/g)) {
            throw new Error("Username or password do not to allow whitespace");
        }
        if (!validator.isLength(validator.trim(userInput.username), { min: 5, max: 20 }) || !validator.isLength(validator.trim(userInput.password), { min: 5, max: 20 })) {
            throw new Error("Username or password you enter has been least 5 characters or up to 20 characters");
        }
        if ((validator.isAlpha(validator.trim(userInput.username)) || validator.isAlphanumeric(validator.trim(userInput.username)) || validator.isNumeric(validator.trim(userInput.username))) || !validator.isStrongPassword(validator.trim(userInput.username), { minLength: 5 })) {
            throw new Error("Username you enter has to contain least 1 lowercase, uppercase, number, symbol character")
        }
        if (!validator.isStrongPassword(validator.trim(userInput.password), { minLength: 5 })) {
            throw new Error("Password you enter has been not secure. Please enter password has to contain least 1 uppercase, number, symbol character")
        }
        if (!validator.equals(validator.trim(userInput.password), validator.trim(userInput.confirmPassword))) {
            throw new Error("Password you enter has not matched yet");
        }
        if (!validator.isAfter(validator.trim(userInput.dateOfBirth), `${new Date().toLocaleString("default", { year: "numeric" }) - 51}-12-31`) || !validator.isBefore(validator.trim(userInput.dateOfBirth), `${new Date().toLocaleString("default", { year: "numeric" }) - 12}-1-1`)) {
            throw new Error("Date of birth you enter has been invalid")
        }
        const hashPassword = await hash(validator.trim(userInput.password), 12);
        const registerUser = await new User({
            username: validator.trim(userInput.username),
            password: hashPassword,
            dateOfBirth: validator.trim(userInput.dateOfBirth),
            country: validator.trim(userInput.country)
        }).save();
        return { ...registerUser._doc, _id: registerUser._id.toString() };
    },
    loginUser: async function ({ username, password }) {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            throw new Error("Username you enter has not been found")
        }
        const isEqualPassword = await compare(password, existingUser.password)
        if (!isEqualPassword) {
            throw new Error("Password you enter has not been incorrect")
        }
        const privateKey = scryptSync(existingUser._id.toString() + existingUser.username + existingUser.password, generateKeySync("aes", { length: 256 }).export().toString("hex"), 4096, { N: 4096, p: 4 }).toString("hex");
        const tokenUser = sign({
            userid: existingUser._id.toString(),
            username: existingUser.username
        }, privateKey, { expiresIn: "2h" });
        return { userid: existingUser._id.toString(), token: tokenUser };
    }
}