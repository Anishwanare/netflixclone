import bcrypt from 'bcrypt';
import User from "../model/UserModel.js";
import { generateToken } from '../utils/jwtToken.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../middleware/errorMiddleWare.js';

export const registerController = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new ErrorHandler("Please fill out the full form", 400);
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ErrorHandler("User Already Registered", 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashPassword
        });

        await user.save();

        generateToken(user, "User Registered Successfully", 200, res);
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            return next(new ErrorHandler(error.message, 400));
        }

        // If not a validation error, handle other errors
        console.log("internal error", error);
        return next(new ErrorHandler("Internal Server Error", 500));
    }
});


export const loginController = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return next(new ErrorHandler("Please fill out the full form", 400));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        generateToken(user, `Welcome Back ${user.name}`, 200, res);
    } catch (error) {
        if (error.name === "ValidationError") {
            return next(new ErrorHandler(error.message, 400));
        }
        console.log("Internal Server Error", error);
        return next(new ErrorHandler("Internal Server Error", error))
    }
});

export const logoutController = async (req, res, next) => {
    try {
        // Clear the userToken cookie
        res.cookie("userToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        });

        // Send response
        return res.status(200).json({
            status: true,
            message: "Logout Successfully!"
        });
    } catch (error) {
        // Log the error and send an error response
        console.error("Logout error:", error);
        return next(new ErrorHandler("Logout failed. Please try again.", 500));
    }
};
