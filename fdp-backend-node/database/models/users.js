const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstname: {
        type: String, 
        default: ''
    },
    lastname: {
        type: String, 
        default: ''
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    user_type: {
        type: String,
        enum: ['admin','customer'],
        required: true
    },
    mobile: {
        type: String, 
        default: ''
    },
    profile_image: {
        type: String, 
        default: ''
    },
    address: {
        type: String, 
        default: ''
    },

}, {timestamps: true});

module.exports = mongoose.model('users', UserSchema);