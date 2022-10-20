//const express = require('express');
//const {MongoClent}= require('mongodb');

import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import dotenv from 'dotenv';
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";


export const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 9000;
//const MONGO_URL = "mongodb://localhost";

async function createConnection() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hello World 😉");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);


app.listen(PORT, () => console.log(`server running at ${PORT}`));

