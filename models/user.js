import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    phoneNumber:{
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
        default: false
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

const User = mongoose.model('User', userSchema);
export default User;
