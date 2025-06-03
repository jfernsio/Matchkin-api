import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use('/api/v1', authRoutes)
app.use('/api/v1/profile',profileRoutes)
app.listen(process.env.PORT,()=>{
    console.log(`Server started at Port ${process.env.PORT}` )
})



