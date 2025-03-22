
// require('dotenv').config({})
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

import express from "express"; 

import connectDB from "./db/index.js";
import dotenv from 'dotenv'; 

dotenv.config({
  path:'./env'
})

// const app = express();

connectDB()
.then(() =>{
  const server =  app.listen(process.env.PORT || 8000, () =>{
    console.log(`Server is running at port: ${process.env.PORT}`);
  })

  server.on("error: ", (error) =>{
    console.log("Server error: ", error);
    process.exit(1); 
  })
})
.catch((err) =>{
  console.log("Mongo DB connection faile!!", err);
  process.exit(1)
})


/*
( async () =>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("Error", (error) => {
      console.log("Error: ", error);
      throw error;
    })

    app.listen(process.env.PORT, () =>{
      console.log(`App is listening on port ${process.env.PORT}`)
    })
  }catch(error){
    console.error("Error: ", error)
    throw error;
  }
})
*/
