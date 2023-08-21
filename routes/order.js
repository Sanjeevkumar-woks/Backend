import express from "express";
import { addOrder, getOrderById, getOrdersHistoryByUserId } from "../helper.js";
const router = express.Router();

// Endpoint to handle order placement
router.post('/place-order', async (req, res) => {
  const { user_Id, products } = req.body;

  // Calculate the total price of the products
  const totalPrice = products.reduce((total, product) => total + product.price, 0);

  const order = {
    user_Id,
    products,
    totalPrice,
    timestamp: new Date().toISOString(),
  };

  const result = await addOrder(order);
  const orderplaces=getOrderById(result.insertedId);
  res.status(201).send({"msg":"Order created sucessfully","order":orderplaces});
});


// Endpoint to fetch order history for a user
router.get('/order-history/:userId', (req, res) => {
    const user_Id = req.params.userId;
    const userOrders = getOrdersHistoryByUserId(user_Id); 
    res.status(200).json(userOrders);
  });
  





export const ordersRouter = router;
