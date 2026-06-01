import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ApiError from '../../common/utils/api-error.js';
import {verifyToken} from '../../common/utils/token.js';

dotenv.config();

const userAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.unauthorized("Unauthorized: No token provided"));
        }
        if (!authHeader.startsWith("Bearer ")) {
            return next(ApiError.unauthorized("Unauthorized: Invalid token format"));
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        next(ApiError.unauthorized("Unauthorized: Invalid token"));
    }
};

export default userAuthenticated;