const router = require("express").Router();
const middleware = require("../../middlewares");

// controllers
const loginController = require("../../controller/login");
const itemsController = require("../../controller/items");
const register = require("../../controller/register");
const cart = require("../../controller/cart");
const address = require("../../controller/address");
const ordersController = require("../../controller/orders");
const catController = require('../../controller/categories');
// login route
router.post("/login", loginController.login);

// register route
router.post("/register", register.register);

//product route
router.get("/items", itemsController.getProducts);

//cart route
router.post("/cart", middleware.validateToken, cart.addToCart);
router.get("/cart", middleware.validateToken, cart.listCart);
router.put("/cart-inc/:_id", middleware.validateToken, cart.quantityIncrement);
router.put("/cart-dec/:_id", middleware.validateToken, cart.quantityDecrement);
router.delete("/cart/:_id", middleware.validateToken, cart.deleteToCart);

//Address route
router.post("/address", middleware.validateToken, address.addressCreate);
router.put("/address/:_id", middleware.validateToken, address.updateAddress);
router.get("/address", middleware.validateToken, address.listAddress);
router.delete("/address/:_id", middleware.validateToken, address.deleteAddress);
router.get("/catgory-dropdown", catController.categoryListDropdown);

//Place Orders route
router.post("/orders", middleware.validateToken, ordersController.placeOrder);
router.post("/order-preview",middleware.validateToken, ordersController.previewOrder);
router.get("/order-list",middleware.validateToken,ordersController.listOrders);
router.get('/all-item',middleware.validateToken, itemsController.getAllItems);
router.get('/all-products',middleware.validateToken, itemsController.getProducts);
router.get('/autocomplet-data',middleware.validateToken, itemsController.getAutocompleteData);
module.exports = router;
