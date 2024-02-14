/**
 * @file User model schema and methods.
 * @module User
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User schema for MongoDB.
 * @typedef {Object} UserSchema
 * @property {string} name - The name of the user.
 * @property {string} phoneNumber - The phone number of the user.
 * @property {string} role - The role of the user. Can be 'user' or 'driver'.
 * @property {boolean} isAdmin - Indicates if the user is an admin.
 * @property {string} cabNo - The cab number associated with the user.
 * @property {string} password - The password of the user.
 */

/**
 * Mongoose schema for the User model.
 * @type {mongoose.Schema<UserSchema>}
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    phoneNumber:{
        unique: true,
        type: String,
        required: [true, 'Please provide your phone number!']
    },
    role:{
        type: String,
        enum: ['user', 'driver'],
        default: 'user'
    },
    isAdmin:{
        type: Boolean,
        default: false,
        select: false
    },
    cabNo:{
        type: String,
        default: null
    },
    password:{
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false
    },
});

/**
 * Hashes the user's password before saving.
 * @function
 * @name preSave
 * @memberof module:User
 * @param {Function} next - The next middleware function.
 */
userSchema.pre('save', async function (next) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete passwordConfirm field
    next();
});

/**
 * User model for MongoDB.
 * @type {mongoose.Model<UserSchema>}
 */
const User = mongoose.model('User', userSchema);
export default User;
