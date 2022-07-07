import { Request, Response, NextFunction } from 'express';
import Service from '../services/team.service';

export default class Controller {
  private service = new Service();

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}