import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import { scryptSync } from "node:crypto";
// import { Types } from "mongoose";
// const { ObjectId } = Types;
// import { User } from "./mongooseModel.mjs";

export const authenticationMiddleware = async (req, res, next) => {
    // const existingUser = await User.findOne({ _id: req.userid });
    // if (!existingUser) {
    //     req.isAuth = false;
    //     console.log(req.userid);
    //     return next();
    // }
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(" ")[1];
    let verifyToken;
    try {
        // verifyToken = verify(token, scryptSync(existingUser._id.toString() + existingUser.username + existingUser.password, generateKeySync("aes", { length: 256 }).export().toString("hex"), 4096, { N: 4096, p: 4 }).toString("hex"))
        verifyToken = verify(token, scryptSync("superSecretKey", "superSecretSalt", 4096, { N: 4096, p: 4 }).toString("hex"));
    }
    catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!verifyToken) {
        req.isAuth = false;
        return next();
    }
    req.userid = verifyToken.userid;
    req.isAuth = true;
    next();
}