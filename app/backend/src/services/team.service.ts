import Model from '../database/models/team';
// import { MyError } from '../utils';

export default class Service {
  private model = Model;

  getAll = async () => {
    const teams = await Model.findAll();
    return teams;
  };
}
