const express=require("express");
const router =express.Router();
const {getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails , productReview, deleteReview, getProductReviews, getAdminProducts} = require("../controllers/productController")
const {isAuthenticatedUser , authorisedRoles} = require("../middleware/auth")

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser , authorisedRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser , authorisedRoles("admin"),updateProduct).delete(isAuthenticatedUser , authorisedRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails);
router.route("/review").post(isAuthenticatedUser , productReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser , deleteReview);
router.route("/admin/products").get(isAuthenticatedUser , authorisedRoles("admin"), getAdminProducts);

module.exports = router
