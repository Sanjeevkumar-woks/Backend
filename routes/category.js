import express from "express";
import { addCategory, getCategories, getCategoryById, updateCategoryById } from "../helper.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await getCategories();
  console.log(categories);
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await getCategoryById(id);
  category
    ? res.send(category)
    : res.status(404).send({ message: "no category found" });
});

router.post("/", async (req, res) => {
  const newcategory = req.body;
  console.log(newcategory);
  const result = await addCategory(newcategory);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateCategory = req.body;
  const result = await updateCategoryById(id, updateCategory);
  res.send(result);
});




export const categoriesRouter = router;
