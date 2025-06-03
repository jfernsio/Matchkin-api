import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
interface Payload {
    id: string,
    role: string
}
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token format

    if(!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Payload;
        (req as any).user = decoded;
        console.log("decoded",decoded)
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
    next()
};

 export default authMiddleware;