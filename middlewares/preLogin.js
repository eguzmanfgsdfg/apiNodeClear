const { isStringOrInt } = require("../helpers/utils");

const preLogin = (req, res, next) => {
    try {
        const username = req.header('username');
        const password = req.header('password');
        if (!username || !password) {
            return res.status(401).json({ message: `Datos insuficientes` });
        }
        if (!isStringOrInt(username) || !isStringOrInt(password)) {
            return res.status(401).json({ message: `Datos invalidos` });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error}` });
    }
};

module.exports = {
    preLogin
};