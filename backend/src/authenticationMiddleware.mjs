import jsonwebtoken from 'jsonwebtoken';
const { verify, TokenExpiredError } = jsonwebtoken;
import { scryptSync } from "node:crypto";

export const authenticationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            req.isAuth = false;
            return next();
        }
        const token = authHeader.split(" ")[1];
        req.isExpire = false;

        let verifyToken;
        verifyToken = verify(token, scryptSync("superSecretKey", "superSecretSalt", 4096, { N: 4096, p: 4 }).toString("hex"));
        if (!verifyToken) {
            req.isAuth = false;
            return next();
        }
        if (!verifyToken.exp) {
            req.isAuth = false;
            return next();
        }

        req.userid = verifyToken.userid;
        req.isAuth = true;
        next();
    }
    catch (err) {
        if (err instanceof TokenExpiredError) {
            req.isExpire = true;
            return next();
        }
        req.isAuth = false;
        return next();
    }
}