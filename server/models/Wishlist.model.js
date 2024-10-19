const mongoose = require("mongoose");
const validator = require("validator");

const wishlistSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  userId : {
    type: String,
    required: true,
  }
});
const WishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = { WishlistModel };
