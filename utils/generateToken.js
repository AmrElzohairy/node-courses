const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

module.exports = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
} 