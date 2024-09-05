const jwt = require('jsonwebtoken');
const User = require('../Modules/UserModule');

const UserAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Token is missing" });
    }

    try {
        const { _id } = jwt.verify(token, 'Ak$User');
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Authorization required" });
    }
};

module.exports = UserAuth;
