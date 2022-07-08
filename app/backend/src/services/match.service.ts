import team from '../database/models/team';
import Model from '../database/models/match';
import { IMatch, IMatchData } from '../interfaces';
import { MyError } from '../utils';

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

    if (inProgress !== undefined) {
      return typedMatches.filter((match: IMatch) => match.inProgress === inProgress);
    }
    return typedMatches;
  };

  create = async (matchData: IMatchData) => {
    const { homeTeam, awayTeam } = matchData;
    if (homeTeam === awayTeam) {
      throw new MyError(401, 'It is not possible to create a match with two equal teams');
    }
    const homeTeamExists = await this.model.findOne({ where: { id: homeTeam } });
    const awayTeamExists = await this.model.findOne({ where: { id: awayTeam } });

    if (!homeTeamExists || !awayTeamExists) {
      throw new MyError(404, 'There is no team with such id!');
    }
    const match = await this.model.create({ ...matchData });

    return match;
  };

  finish = async (id: number) => {
    await this.model.update({
      inProgress: false,
    }, { where: { id } });
  };
}
