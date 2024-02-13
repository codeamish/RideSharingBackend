import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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



userSchema.pre('save', async function (next) {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete passwordConfirm field
    next();
});

const User = mongoose.model('User', userSchema);
export default User;
