import { Request, Response, NextFunction } from 'express';
import Service from '../services/match.service';

export default class Controller {
  private service = new Service();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      let isInProgress;
      if (inProgress) isInProgress = inProgress === 'true';
      const teams = await this.service.getAll(isInProgress);

      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
