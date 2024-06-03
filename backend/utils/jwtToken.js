import jwt from "jsonwebtoken"

export const generateToken = (user, message, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })

    res.cookie("userToken", token, {
        expiresIn: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });
    res.status(statusCode).json({
        status: true,
        message: message,
        user: user,
        token: token
    })

}