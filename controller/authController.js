import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const signToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

const createAndSendToken = (user,statusCode, res) => {
    const token = signToken(user._id);
    // const cookieOptions = {
    //     expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //     ), // 90 days
    //     httpOnly: true,
    // };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
        user: user,
        },
    });
};

const signup = async (req, res,next) => {
    try {

        console.log(req.body);
        const user = await User.create(req.body);
        createAndSendToken(user, 201, res);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    next();
}

const login = async (req, res) => {
    const { phoneNumber , password } = req.body;
    if (!phoneNumber || !password) {
        return res.status(400).json({ message: 'Please provide phone number and password' });
    }
    const user = await User.findOne({ phoneNumber }).select('+password');
    createAndSendToken(user, 200, res);
}


const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
        return next(
            new AppError('You do not have permission to perform this action', 403)
        ); // 403 means forbidden
        }
        next();
    };
};

export {
    signup,
    login,
    restrictTo
}
