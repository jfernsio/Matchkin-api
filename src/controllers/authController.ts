import express, {Request,Response} from 'express';
import User  from '../models/userModel';
import jwt from 'jsonwebtoken';
import { generateOtp } from '../utils/generateOtp';
import client from '../config/redis';

const authController = async (req: Request, res: Response) => {
    const {email,role} = req.body;
    if (!email || !role) {
        return res.status(400).json({ message: 'Email and role are required' });
    }
    const normalizedEmail = email.toLowerCase();
    //check if otp already exists in redis
    const redisKey = `otp:${normalizedEmail}`;
    const alreadyExists = await client.get(redisKey);
    if (alreadyExists) {
        return res.status(429).json({ message: 'OTP already sent, try again in 5 mins' });
    }

    const otp = generateOtp();
    await client.set(redisKey, otp, {
        EX: 300, // OTP expires in 5 minutes
        NX: true // Only set the key if it does not already exist
    });
    res.status(200).json({ message:  'OTP sent successfully', otp }); 
}

const authVerifyController = async (req: Request, res: Response) => {
  try {
    const { email, otp, role } = req.body;
    if (!email || !otp || !role) {
      return res.status(400).json({ message: 'Email, OTP, and role are required' });
    }

    const normalizedEmail = email.toLowerCase();
    const redisKey = `otp:${normalizedEmail}`;
    const storedOtp = await client.get(redisKey);

    if (!storedOtp) {
      return res.status(404).json({ message: 'OTP not found or expired' });
    }

    if (storedOtp !== otp) {
      return res.status(403).json({ message: 'Invalid OTP' });
    }

    await client.del(redisKey); // clear used OTP

    
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      user = new User({ email: normalizedEmail, role });
      await user.save();
      console.log('New user created:', user);
    } else {
      console.log('Existing user logged in:', user);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.log('Error during OTP verification:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export { authController, authVerifyController };