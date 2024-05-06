import { Cart } from "../models/cart.model.js";
import { MenuItem } from "../models/menu.model.js";
import { User } from "../models/user.model.js";
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const cart = await Cart.findOne({ user: userId }).populate("items.Menu");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { name, quantity, username } = req.body;

    const userId = await User.findOne({ username });
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const productId = await MenuItem.findOne({ name });
    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log(userId.id);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId.id, items: [{ Menu: productId.id }] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => String(item.Menu) === String(productId.id)
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ Menu: productId.id });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { username, itemId } = req.body;

    if (!username || !itemId) {
      return res
        .status(400)
        .json({ message: "username and itemId are required" });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => String(item._id) !== itemId);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOneAndDelete({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCart, addToCart, removeFromCart, clearCart };
