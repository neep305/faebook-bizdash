const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    facebook: {
        id: String,
        accessToken: String,
        refreshToken: String,
        email: String,
        name: String
    }
},{timestamps: true});

module.exports = mongoose.model('user', UserSchema);