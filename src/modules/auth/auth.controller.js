import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import pool from '../../../index.mjs';
import bcrypt from "bcrypt";
import { generateToken } from "../../common/utils/token.js";

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            return next(ApiError.badRequest("User already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
        return ApiResponse.created(res, "User registered successfully", newUser.rows[0]);
    }
    catch (err) {
        return next(new ApiError(500, err.message));
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return next(ApiError.badRequest("Invalid email or password"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
            return next(ApiError.badRequest("Invalid email or password"));
        }

        const token = generateToken({ id: user.rows[0].id, email: user.rows[0].email });

        return ApiResponse.ok(res, "Login successful", { ...user.rows[0] , token });
    }
    catch (err) {
        return next(new ApiError(500, err.message));
    }
}

export {
    register,
    login
};