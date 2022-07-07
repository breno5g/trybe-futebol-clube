import Model from '../database/models/team';
// import { MyError } from '../utils';

export default class Service {
  private model = Model;

  getAll = async () => {
    const teams = await this.model.findAll();
    return teams;
  };

  getById = async (id: string) => {
    const team = await this.model.findOne({ where: { id } });
    return team;
  };
}
