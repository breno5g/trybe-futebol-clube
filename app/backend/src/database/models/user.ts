import { Model, STRING } from 'sequelize';
import db from '.';

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
  sequelize: db,
  modelName: 'user',
  underscored: true,
  timestamps: false,
});
