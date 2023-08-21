import {
  getProductsByFilter,
  getProductById,
  deleteProductById,
  addProducts,
  updateProductById,
} from "../helper.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getProductsByFilter(req);
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //db.products.findOne({id:"102"})
  // var product=products.find((x)=>x.id===id)
  const product = await getProductById(id);
  product
    ? res.send(product)
    : res.status(404).send({ message: "no products found" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await deleteProductById(id);
  res.send(product);
});

router.post("/", async (req, res) => {
  const newproducts = req.body;
  const result = await addProducts(newproducts);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateProduct = req.body;
  const result = await updateProductById(id, updateProduct);
  res.send(result);
});

export const productsRouter = router;
