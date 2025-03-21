
// require('dotenv').config({})
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

// import express from "express"; 

import connectDB from "./db/index.js";
import dotenv from 'dotenv'; 

dotenv.config({
  path:'./env'
})

// const app = express();

connectDB()


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
