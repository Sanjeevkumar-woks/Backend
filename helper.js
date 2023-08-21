import { client } from "./index.js";
import bcrypt from "bcrypt";

//PRODUCTS
export function getProductsByFilter(req) {
  return client.db("ecom").collection("products").find(req.query).toArray();
}
export function getProductById(id) {
  return client.db("ecom").collection("products").findOne({ _id: id });
}
export function deleteProductById(id) {
  return client.db("ecom").collection("products").deleteOne({ _id: id });
}
export function updateProductById(id, updateProduct) {
  return client
    .db("ecom")
    .collection("products")
    .updateOne({ _id: id }, { $set: updateProduct });
}
export async function addProducts(newproducts) {
  return await client.db("ecom").collection("products").insertMany(newproducts);
}

//CART
export function getCart() {
  return client.db("ecom").collection("cart").find().toArray();
}

export function insertOneIteamToCart(product) {
  return client
    .db("ecom")
    .collection("cart")
    .insertOne({ ...product, qty: 1 });
}

export function getCartIteamBYId(product) {
  return client.db("ecom").collection("cart").findOne({ _id: product._id });
}

export function updateQtyById(product, type) {
  return client
    .db("ecom")
    .collection("cart")
    .updateOne(
      { _id: product._id },
      { $inc: { qty: type === "increment" ? +1 : -1 } }
    );
}
export function deteteCartById(product) {
  return client.db("ecom").collection("cart").deleteOne({ _id: product._id });
}

//Category
export function getCategories() {
  client.db("ecom").collection("category").find().toArray();
}
export function getCategoryById(category_id) {
  return client.db("ecom").collection("category").findOne({ category_id });
}

export async function addCategory(newcategory) {
  return await client.db("ecom").collection("category").insertMany(newcategory);
}

export function updateCategoryById(id, updateProduct) {
  return client
    .db("ecom")
    .collection("category")
    .updateOne({ _id: id }, { $set: updateProduct });
}

export function getProductCountByCategory(category_id) {
  returnclient
    .db("ecom")
    .collection("category")
    .aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory_id",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $unwind: "$subcategory",
      },
      {
        $match: {
          "subcategory.category_id": category_id,
        },
      },
      {
        $group: {
          _id: "$subcategory.name",
          product_count: { $sum: 1 },
        },
      },
    ]);
}

//SubCategory
export function getSubCategories() {
  client.db("ecom").collection("subcategory").find().toArray();
}
export function getSubCategoryById(subcategory_id) {
  return client
    .db("ecom")
    .collection("subcategory")
    .findOne({ subcategory_id });
}

export async function addSubCategory(newsubcategory) {
  return await client
    .db("ecom")
    .collection("subcategory")
    .insertMany(newsubcategory);
}

export function updateSubCategoryById(id, updateProduct) {
  return client
    .db("ecom")
    .collection("products")
    .updateOne({ _id: id }, { $set: updateProduct });
}

//ORDER

export async function addOrder(order) {
  return await client.db("ecom").collection("order").insertOne(order);
}

export async function getOrdersHistoryByUserId(user_Id) {
  return client.db("ecom").collection("order").find({ user_Id }).toArray();
}

export function getOrderById(order_id) {
  return client
    .db("ecom")
    .collection("order")
    .findOne({ _id: ObjectId(order_id) });
}
//USERS
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no. of rounds)
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function addUser(username, hashPassword) {
  const newuser = {
    username: username,
    password: hashPassword,
  };
  return await client.db("ecom").collection("users").insertOne(newuser);
}

export async function getUserByName(username) {
  return await client
    .db("ecom")
    .collection("users")
    .findOne({ username: username });
}
