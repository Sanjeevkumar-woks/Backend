import {
  deteteCartById,
  getCart,
  getCartIteamBYId,
  insertOneIteamToCart,
  updateQtyById,
} from "../helper.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await getCart();
  res.send(result);
});

router.put("/", async (req, res) => {
  const product = req.body;
  const { type } = req.query;
  const itemExist = await getCartIteamBYId(product);
  if (itemExist) {
    if (type === "decrement" && itemExist.qty <= 1) {
      console.log("delete");
      await deteteCartById(product);
    } else {
      await updateQtyById(product, type);
    }
  } else {
    await insertOneIteamToCart(product);
  }

  const allCart = await getCart();

  res.send(allCart);
});

export const cartRouter = router;
