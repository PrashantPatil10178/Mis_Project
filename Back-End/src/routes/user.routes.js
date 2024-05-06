import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getdata,
} from "../controllers/user.controllers.js";

import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { createOrder } from "../controllers/order.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").post(verifyJWT, getdata);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/addtoCart").post(addToCart);
router.route("/getCart").post(verifyJWT, getCart);
router.route("/removeFromCart").post(removeFromCart);
router.route("/createOrder").post(createOrder);

export default router;
