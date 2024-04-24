const express=require("express");
const { registerUser, loginUser, logoutUser , forgotPassword, resetPassword , getUserDetails , updatePassword , updateProfile, getAllUsers, getSingleUser, updateUserRole , deleteUser} = require("../controllers/userController");
const {isAuthenticatedUser , authorisedRoles} = require("../middleware/auth")
const router =express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser , getUserDetails);
router.route('/password/update').put(isAuthenticatedUser , updatePassword);
router.route('/profile/update').put(isAuthenticatedUser , updateProfile);
router.route('/admin/getAllUsers').get(isAuthenticatedUser , authorisedRoles("admin") , getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser , authorisedRoles("admin") , getSingleUser).put(isAuthenticatedUser , authorisedRoles("admin") , updateUserRole).delete(isAuthenticatedUser , authorisedRoles("admin") , deleteUser);;
module.exports = router;