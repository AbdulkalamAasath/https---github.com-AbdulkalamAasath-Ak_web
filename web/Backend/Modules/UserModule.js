const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
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
    phone: {
        type: String,
        required: true
    }
});

UserSchema.statics.signup = async function(name, email, password, phone) {
    if (!email || !password || !name || !phone) {
        throw Error("Missing Field");
    }
    if (!validator.isEmail(email)) {
        throw Error("Enter a valid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Enter a Strong password");
    }
    const exist = await this.findOne({ email });
    if (exist) {
        throw Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ name, email, password: hash, phone });
    return user;
}

UserSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("Username and password required");
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Invalid Email");
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
        throw Error("Incorrect Password");
    }
    return user;
}

module.exports = mongoose.model('User', UserSchema);
