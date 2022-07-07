import { Model, STRING } from 'sequelize';
import sequelize from './index';

export default class user extends Model {
  // static associate(_models) {
  // }
}

user.init({
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  sequelize,
  modelName: 'user',
  timestamps: false,
});
