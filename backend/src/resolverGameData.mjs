import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;

import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

import { scryptSync } from "node:crypto";
import validator from "validator";

// import { Types } from "mongoose";
// const { ObjectId } = Types;

import { User, Token } from "./mongooseModel.mjs";

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
        if (validator.isEmpty(userInput.username) || validator.isEmpty(userInput.password) || validator.isEmpty(userInput.confirmPassword) || validator.isEmpty(userInput.dateOfBirth) || validator.isEmpty(userInput.country)) {
            throw new Error("All fields you enter can not be empty");
        }
        if (existingUser) {
            throw new Error("Username you enter has already existed");
        }
        if (validator.matches(userInput.username, /\s/g) || validator.matches(userInput.password, /\s/g)) {
            throw new Error("Username or password can not allow whitespace");
        }
        if (!validator.isLength(validator.trim(userInput.username), { min: 5, max: 20 }) || !validator.isLength(validator.trim(userInput.password), { min: 5, max: 20 })) {
            throw new Error("Username or password you enter has been least 5 characters or up to 20 characters");
        }
        if (validator.equals(validator.trim(userInput.username), validator.trim(userInput.password))) {
            throw new Error("Username and password can not be similar. Please enter password has to be different from username");
        }
        if (!validator.isStrongPassword(validator.trim(userInput.username), { minLength: 5 })) {
            throw new Error("Username you enter has to contain least 1 lowercase, uppercase, number, symbol character");
        }
        if (!validator.isStrongPassword(validator.trim(userInput.password), { minLength: 5 })) {
            throw new Error("Password you enter has not been secure. Please enter password has to contain least 1 lowercase, uppercase, number, symbol character");
        }
        if (!validator.equals(validator.trim(userInput.password), validator.trim(userInput.confirmPassword))) {
            throw new Error("Password you enter has not matched yet");
        }
        if (!validator.isAfter(validator.trim(userInput.dateOfBirth), `${new Date().toLocaleString("default", { year: "numeric" }) - 51}-12-31`) || !validator.isBefore(validator.trim(userInput.dateOfBirth), `${new Date().toLocaleString("default", { year: "numeric" }) - 12}-1-1`)) {
            throw new Error("Date of birth you choose has been invalid");
        }
        if (!userInput.termCondition) {
            throw new Error("You have to check mark to agree the terms and the policy of the service");
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
        if (validator.isEmpty(username) || validator.isEmpty(password)) {
            throw new Error("All fields you enter can not be empty");
        }
        if (validator.matches(username, /\s/g) || validator.matches(password, /\s/g)) {
            throw new Error("Username or password can not allow whitespace");
        }
        if (!existingUser) {
            throw new Error("Username you enter has not been found");
        }
        const isEqualPassword = await compare(password, existingUser.password)
        if (!isEqualPassword) {
            throw new Error("Password you enter has not been incorrect");
        }
        const privateKey = scryptSync("superSecretKey", "superSecretSalt", 4096, { N: 4096, p: 4 }).toString("hex");
        const tokenUser = sign({
            userid: existingUser._id.toString(),
            username: existingUser.username
        }, privateKey, { expiresIn: "1h" });

        const tokenRefreshUser = sign({
            userid: existingUser._id.toString(),
            username: existingUser.username
        }, privateKey, { expiresIn: "10h" });

        await new Token({
            token: tokenUser,
            expireDate: new Date().setSeconds(new Date().getSeconds() + 1 * 60 * 60),
            userid: existingUser._id.toString(),
            username: existingUser.username
        }).save();
        await new Token({
            token: tokenRefreshUser,
            expireDate: new Date().setSeconds(new Date().getSeconds() + 10 * 60 * 60),
            userid: existingUser._id.toString(),
            username: existingUser.username
        }).save();

        return { userid: existingUser._id.toString(), token: tokenUser, tokenRefresh: tokenRefreshUser };
    },
    logoutUser: async function ({ userid }, req) {
        if (req.raw.isExpire) {
            throw new Error("Expiration token. You have to log in again");
        }
        if (!req.raw.isAuth) {
            throw new Error("Unauthorized request");
        }
        if (userid !== req.raw.userid) {
            throw new Error("Unauthorized user");
        }
        const existingUser = await User.findOne({ _id: req.raw.userid });
        if (!existingUser) {
            throw new Error("User with given ID can not be found");
        }
        return { userid: req.raw.userid, isAuth: req.raw.isAuth, isExpire: req.raw.isExpire };
    },
    tokenRefreshUser: async function ({ tokenRefresh, token }) {
        if (!tokenRefresh) {
            throw new Error("Empty token refresh");
        }
        if (!token) {
            throw new Error("Empty token");
        }

        let tokenRefresh_;
        tokenRefresh_ = await Token.findOne({ token: tokenRefresh });
        let token_;
        token_ = await Token.findOne({ token: token });
        let newToken;

        if (!tokenRefresh_ || tokenRefresh_?.expireDate.getTime() < new Date().getTime()) {
            tokenRefresh_ && await Token.findOneAndDelete({ _id: tokenRefresh_._id.toString() });
            throw new Error("Expiration token refresh. You have to log in again");
        }
        if (!token_ || token_?.expireDate.getTime() < new Date().getTime()) {
            token_ && await Token.findOneAndDelete({ _id: token_._id.toString() });
            const { userid } = await tokenRefresh_.populate("userid");
            const privateKey = scryptSync("superSecretKey", "superSecretSalt", 4096, { N: 4096, p: 4 }).toString("hex");
            newToken = sign({
                userid: userid._id.toString(),
                username: userid.username
            }, privateKey, { expiresIn: "1h" });
            return { token: newToken, tokenRefresh: tokenRefresh_.token };
        }
        if (!newToken) {
            return { token: token_.token, tokenRefresh: tokenRefresh_.token };
        }
    }
}