/**
 * Retrieves all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the retrieved users or an error message.
 */
import User from "../models/user.js";

// getAllUsers function
// 1. Find all users
// 2. Return the users
// 3. Catch any errors and return the error message
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const updateMe = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req
            .user
            .id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export{
    getAllUsers,
    updateMe
}

