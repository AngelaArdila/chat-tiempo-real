const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;
