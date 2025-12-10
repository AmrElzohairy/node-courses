const asyncHandler = require('express-async-handler');
let User = require("../models/userSchema.js");
let statusMessage = require("../utils/statusMessage.js");
let bcrypt = require('bcrypt');
let salt = 5;
let generateToken = require('../utils/generateToken.js');


let getAllUsers = asyncHandler(async (req, res) => {
    let users = await User.find({}, { __v: 0 });
    res.status(200).json({
        status: statusMessage.SUCCESS,
        data: { users }
    });
});



let login = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email }).select('+password');
    if (!user) {
        return res.status(401).json({
            status: "error",
            message: "Invalid credentials"
        });
    }
    let isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
        //generate jwt token
        let token = generateToken({ id: user._id, email: user.email , role: user.role });
        res.status(200).json({
            status: statusMessage.SUCCESS,
            data: { token: token, user: user }
        });
    } else {
        res.status(401).json({
            status: "error",
            message: "Invalid credentials"
        });
    }
});

let register = asyncHandler(async (req, res) => {
    let { firstName, lastName, email, password, role } = req.body;
    let hashedPassword = await bcrypt.hash(password, salt);
    let newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        avater: req.file.filename
    });

    //generate jwt token
    let token = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role });
    await newUser.save();
    newUser.password = undefined;
    res.status(201).json({
        status: statusMessage.SUCCESS,
        data: { token: token, user: newUser }
    });
});




module.exports = {
    getAllUsers,
    login,
    register
};