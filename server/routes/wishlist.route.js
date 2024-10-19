const express = require("express");
const {
  getWishlistController,
  addToWishlistController,
  removeFromWishlistController,
} = require("../controllers/wishlist.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");

const wishlistRouter = express.Router();

wishlistRouter.get("/",authenticate, getWishlistController);
// productsRouter.get("/:_id", getSingleProductController);
wishlistRouter.post("/add",authenticate, addToWishlistController);
wishlistRouter.delete("/delete/:_id",authenticate, removeFromWishlistController);

module.exports = { wishlistRouter };
