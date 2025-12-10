let express = require('express');
let router = express.Router();
let usersController = require('../controllers/users.controller.js');
let verifyToken = require('../middlewares/verifyToken.js');
let allowTo = require('../middlewares/allowTo.js');
let userRoles = require('../utils/userRoles.js');
const multer = require('multer')
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];

    if (imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(new Error('Only image files are allowed'), false)
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter
})



router.route('/').get(verifyToken, allowTo(userRoles.ADMIN), usersController.getAllUsers);
router.route('/register').post(upload.single('avatar'), usersController.register);
router.route('/login').post(usersController.login);

module.exports = router;