let jwt = require('jsonwebtoken');
let statusMessage = require('../utils/statusMessage.js');


let verifyToken = (req, res, next) => {
    let authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: statusMessage.FAIL,
            message: "Unauthorized no token provided"
        });
    }
    try {
       let token = authHeader.split(' ')[1];
        let userData = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = userData;
        next();
    } catch (err) {
        return res.status(401).json({
            status: statusMessage.FAIL,
            message: "Unauthorized"
        });
    }
}

module.exports = verifyToken;