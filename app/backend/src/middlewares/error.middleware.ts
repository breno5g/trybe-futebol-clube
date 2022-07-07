import { Request, Response, NextFunction } from 'express';
import { MyError } from '../utils';

const error = (err: MyError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: 'Internal server error' });
};

export default error;
