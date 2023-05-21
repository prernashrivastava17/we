var express = require('express')
var router = express.Router()
var user = require('../controller/user_ctrl')
const middileware = require('../middlerware')
router.post('/userRegistration', user.userRegistration);
router.post('/getUserByToken', user.getUserByToken);
router.post('/userLogin', user.userLogin);
router.post('/checkOtpisVailid', user.checkOtpisVailid);

router.post('/forgotPassword', user.forgotPassword);
router.post('/resetPassword', user.resetPassword);
router.post('/changePassword',middileware.checkAuthentication, user.changePassword);
router.put('/updateProfile',middileware.checkAuthentication,user.updateProfile);

module.exports = router;