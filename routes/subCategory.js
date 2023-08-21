import express from "express";
import { addSubCategory, getSubCategories, getSubCategoryById, updateSubCategoryById } from "../helper.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const subcategories = await getSubCategories();
  res.send(subcategories);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const subcategory = await getSubCategoryById(id);
  product
    ? res.send(subcategory)
    : res.status(404).send({ message: "no category found" });
});

router.post("/", async (req, res) => {
  const newsubcategory = req.body;
  const result = await addSubCategory(newsubcategory);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateSubCategory = req.body;
  const result = await updateSubCategoryById(id, updateSubCategory);
  res.send(result);
});




export const subCategoriesRouter = router;
