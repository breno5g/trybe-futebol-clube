import { ILogin, IUser } from '../interfaces/index';
import Model from '../database/models/user';
import { Bcrypt, JWT, MyError } from '../utils';

export default class Service {
  private model = Model;
  private jwt = new JWT();
  private bcrypt = new Bcrypt();

  login = async (loginData: ILogin) => {
    const userData = await this.model.findOne({ where: { email: loginData.email } });
    if (!userData) throw new MyError(403, 'User email or password is incorrect');
    const { password, ...userWithoutPasword } = userData as unknown as IUser;

    const isValid = await this.bcrypt.comparePassword(loginData.password, password);
    if (!isValid) {
      throw new MyError(403, 'User email or password is incorrect');
    }
    return this.jwt.generateToken(userWithoutPasword);
  };
}
