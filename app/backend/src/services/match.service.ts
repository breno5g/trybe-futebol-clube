import team from '../database/models/team';
import Model from '../database/models/match';
// import { MyError } from '../utils';

export default class Service {
  private model = Model;

  getAll = async () => {
    const teams = await this.model.findAll({
      include: [
        { model: team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return teams;
  };
}
