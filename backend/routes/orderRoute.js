const express = require('express');
const { isAuthenticatedUser , authorisedRoles } = require('../middleware/auth');
const router = express.Router();
const {placeNewOrder, getSingleOrder, myOrders, getAllOrders,updateOrderStatus,deleteOrder} = require("../controllers/orderController")

router.route("/order/new").post(isAuthenticatedUser , placeNewOrder);
router.route("/order/:id").get(isAuthenticatedUser  , getSingleOrder);
router.route("/myOrders").get(isAuthenticatedUser , myOrders);
router.route("/getAllOrders").get(isAuthenticatedUser , authorisedRoles("admin") , getAllOrders);
router.route("/updateOrderStatus/:id").put(isAuthenticatedUser , authorisedRoles("admin") , updateOrderStatus);
router.route("/deleteOrder/:id").delete(isAuthenticatedUser , authorisedRoles("admin") , deleteOrder);


module.exports = router