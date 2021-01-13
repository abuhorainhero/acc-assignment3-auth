const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");
const userController = require("../controllers/user.controller");

// GET users Listing
router.post("/", userController.isAuthenticated, shopController.create);

router.get("/", shopController.getAll);

router.get("/:id", shopController.getById);

router.patch("/:id", userController.isAuthenticated, shopController.updateById);

router.delete( "/:id", userController.isAuthenticated, shopController.deleteById);

module.exports = router;
