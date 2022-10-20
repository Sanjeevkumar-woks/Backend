import { client } from "./index.js";
import  bcrypt from "bcrypt";
import { ObjectId } from "mongodb";


export function getMoviesByFilter(req) {
  return client.db("films").collection("movies").find(req.query).toArray();
}
export function getMovieById(id) {
  return client.db("films").collection("movies").findOne({ _id: ObjectId(id)});
}
export function deleteMovieById(id) {
  return client.db("films").collection("movies").deleteOne({ _id: ObjectId(id) });
}
export function updateMovieById(id,updateMovie) {
    return client.db("films").collection("movies").updateOne({ _id: ObjectId(id) },{$set:updateMovie});
  }
export async function addMovies(newmovies) {
  return await client.db("films").collection("movies").insertMany(newmovies);
}

// users
export async function genPassword(password){
  const salt= await bcrypt.genSalt(10) //bcrypt.genSalt(no. of rounds)
  const hashedPassword=await bcrypt.hash(password,salt);
  return hashedPassword;
}

export async function addUser(username,hashPassword) {
  const newuser={
    "username":username,
    "password": hashPassword
  }
  return await client.db("films").collection("users").insertOne(newuser);
}

export async function getUserByName(username) {
 return await client.db("films").collection("users").findOne({"username":username});
}
