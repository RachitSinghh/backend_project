import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
  try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(`\n MongoDB connected !!! DB HOST: ${connectionInstance.host}`)
  }catch(error) {
    console.log("MONGODB CONNECTION ERROR: ", error);
    process.exit(1); 
  }
}

export default connectDB;

// console log connection Instance 