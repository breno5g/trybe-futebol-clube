import { Request, Response, NextFunction } from 'express';
import Service from '../services/user.service';

export default class Controller {
  private service = new Service();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
