import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        throw new Error("Invalid token");
    }
}

export {
    generateToken,
    verifyToken
};