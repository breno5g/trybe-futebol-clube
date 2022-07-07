import JWT from '../utils/jwt';
import { ILogin } from '../interfaces/index';
import Model from '../database/models/user';

export default class Service {
  private model = Model;
  private jwt = new JWT();

  login = async (loginData: ILogin) => {
    const user = await this.model.findOne({ where: { email: loginData.email } });
    return user;
  };
}
