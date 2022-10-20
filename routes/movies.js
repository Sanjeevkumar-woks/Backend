import {
  getMoviesByFilter,
  getMovieById,
  deleteMovieById,
  addMovies,
  updateMovieById,
} from "../helper.js";
import express from "express";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/",auth, async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const movies = await getMoviesByFilter(req);
  res.send(movies);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //db.movies.findOne({id:"102"})
  // var movie=movies.find((x)=>x.id===id)
  const movie = await getMovieById(id);
  movie
    ? res.send(movie)
    : res.status(404).send({ message: "no movies found" });
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await deleteMovieById(id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const newmovies = req.body;
  const result = await addMovies(newmovies);
  res.send(result);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateMovie = req.body;
    const result = await updateMovieById(id,updateMovie);
    res.send(result);
  });

export const moviesRouter = router;




//normal CURD

// app.get('/movies',(req,res)=>{
//     const {language}=req.query;
//     var movie=movies.filter((x)=>x.language===language);
//     console.log(movie);
//    res.send(movie);
// })
// app.get('/movies/:id',(req,res)=>{
//     const {id}=req.params;
//     console.log(id);
//      var movie=movies.find((x)=>x.id===id)
//      console.log(movie);
//     res.send(movie);
// })
// app.get('/movies', async (req,res)=>{
//     if(req.query.rating){
//         req.query.rating = + req.query.rating; 
//     }
//     const movies = await client.db('films').collection("movies").find(req.query).toArray();
//     res.send(movies);
// });
// app.get('/movies/:id', async (req,res)=>{
//     const {id}=req.params;
//     console.log(id);
//     //db.movies.findOne({id:"102"})
//     // var movie=movies.find((x)=>x.id===id)
//     const movie= await client.db('films').collection("movies").findOne({id:id});
//      console.log(movie);
//     movie? res.send(movie):res.status(404).send({message:"no movies found"});
// });
// app.delete('/movies/:id', async (req,res)=>{
//     const {id}=req.params;
//     console.log(id);
//     //db.movies.findOne({id:"102"})
//     // var movie=movies.find((x)=>x.id===id)
//     const movie= await client.db('films').collection("movies").deleteOne({id:id});
//      console.log(movie);
//     res.send(movie);
// });
// app.post('/movies', async(req,res)=>{
//     const newmovies=req.body;
//     console.log(newmovies);
//     const result= await client.db('films').collection("movies").insertMany(newmovies);
//     res.send(result);
// });