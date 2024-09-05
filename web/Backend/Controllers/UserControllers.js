const User = require('../Modules/UserModule');
const jwt = require('jsonwebtoken');
const Data = require('../Modules/DataModule')
const createToken = (_id) => {
    return jwt.sign({ _id }, "Ak$User", { expiresIn: '20d' });
}
const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token, name: user.name,userid:user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const UserSignup = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const user = await User.signup(name, email, password, phone);
        const token = createToken(user._id);
        res.status(200).json({ name: user.name, email: user.email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const DataEntry = async (req, res) => {
    const {Name,Email,Product_Name,Product_descrpition,Address,Contact_number,Customer_Address,Customer_Name } = req.body;
    const {id} = req.params
    try {
        const data = await Data.create({Name,Email,Product_Name,Product_descrpition,Address,Contact_number,Customer_Address,Customer_Name,cid:id});
        const Approved = await Data.findOne({Product_Name:Product_Name}).select('Approved')
        res.status(200).json({ Name,Product_Name,Customer_Name,Approved });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const Dataretrive = async (req, res) => {
    const {id} = req.params
    try {
        const dataretrive = await Data.find({cid:id})
        res.status(200).json(dataretrive);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
module.exports = { UserSignup, UserLogin,DataEntry ,Dataretrive};