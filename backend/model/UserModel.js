import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function(value) {
                return /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
