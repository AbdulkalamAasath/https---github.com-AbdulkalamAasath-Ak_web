const Admin = require('../Modules/AdminModule');
const jwt = require('jsonwebtoken');
const User = require('../Modules/UserModule')
const Data = require('../Modules/DataModule')
// Function to create a JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, "Ak$Admin", { expiresIn: '20d' });
}

// Admin login handler
const AdminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token, name: user.name });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
// Admin signup handler
const AdminSignup = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const admin = await Admin.signup(name, email, password, phone);
        const token = createToken(admin._id);
        res.status(200).json({ name: admin.name, email: admin.email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const usersinfo =  async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const updateproduct =  async (req, res) => {
    try {
        const {id} = req.params
        const data = await Data.findOneAndUpdate({_id:id},{Approved:true},{new:true})
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { AdminSignup, AdminLogin,usersinfo,updateproduct};
