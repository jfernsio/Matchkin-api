import express from 'express';
import dotenv from 'dotenv';
import connectDB from './services/connection';
dotenv.config()

const app = express()

connectDB()
app.listen(process.env.PORT,()=>{
    console.log(`Server started at Port ${process.env.PORT}` )
})


