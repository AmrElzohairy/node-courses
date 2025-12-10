let  statusMessage  = require("../utils/statusMessage");

module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("current user role ==============>" + req.currentUser.role);
        
        if (!allowedRoles.includes(req.currentUser.role)) {
            return res.status(403).json({
                status: statusMessage.FAIL,
                message: "Forbidden: You don't have enough permission to access this resource"
            });
        }
        next();
    }
}