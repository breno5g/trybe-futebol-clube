import { Model, STRING } from 'sequelize';
import db from '.';

class team extends Model {
  // static associate(models) {
  //   // define association here
  // }
}
team.init({
  teamName: STRING,
}, {
  sequelize: db,
  modelName: 'team',
  underscored: true,
  timestamps: false,
});
