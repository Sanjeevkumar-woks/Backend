import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import { productsRouter } from "./routes/products.js";
import { usersRouter } from "./routes/users.js";
import { cartRouter } from "./routes/cart.js";
import { categoriesRouter } from "./routes/category.js";
import { ordersRouter } from "./routes/order.js";
import { subCategoriesRouter } from "./routes/subCategory.js";

export const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 9000;
//const MONGO_URL = process.env.MONGO_URL
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hello World 😉");
});

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/subcategories", subCategoriesRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => console.log(`server running at ${PORT}`));
