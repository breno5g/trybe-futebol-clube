import team from '../database/models/team';
import Model from '../database/models/match';
import { IMatch } from '../interfaces';
// import { MyError } from '../utils';

export default class Service {
  private model = Model;

  getAll = async (inProgress: boolean | undefined) => {
    const matches = await this.model.findAll({
      include: [
        { model: team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    const typedMatches = matches as unknown as IMatch[];
    if (inProgress) return typedMatches.filter((match: IMatch) => match.inProgress === inProgress);
    return typedMatches;
  };
}
