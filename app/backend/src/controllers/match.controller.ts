import { Request, Response, NextFunction } from 'express';
import Service from '../services/match.service';

export default class Controller {
  private service = new Service();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      let isInProgress;
      if (inProgress) isInProgress = inProgress === 'true';
      const matches = await this.service.getAll(isInProgress);

      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await this.service.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  };
}
