import { ILogin, IUser } from '../interfaces/index';
import Model from '../database/models/user';
import { Bcrypt, JWT, MyError } from '../utils';

export default class Service {
  private model = Model;
  private jwt = new JWT();
  private bcrypt = new Bcrypt();

  login = async (loginData: ILogin) => {
    const userData = await this.model.findOne({ where: { email: loginData.email } });
    if (!userData) throw new MyError(401, 'Incorrect email or password');
    const { password, ...userWithoutPasword } = userData as unknown as IUser;

    const isValid = await this.bcrypt.comparePassword(loginData.password, password);
    if (!isValid) {
      throw new MyError(401, 'Incorrect email or password');
    }
    return this.jwt.generateToken(userWithoutPasword);
  };

  validate = async (token: string) => {
    const isValid = this.jwt.validateToken(token);
    const role = isValid?.role;
    return { role };
  };
}
