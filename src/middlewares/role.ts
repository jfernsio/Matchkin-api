import {Request, Response, NextFunction} from 'express';


const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req as any).user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!roles.includes((req as any).user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }

    next();
  };
};



export default roleMiddleware;