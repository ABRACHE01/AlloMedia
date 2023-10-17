import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 255,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    role: {
        type: String,
        required: [true, 'Please add your role'],
        enum: ['client', 'deliver'],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});



const User = mongoose.model('User', userSchema);

export { User };
