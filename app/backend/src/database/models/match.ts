import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team';

class Match extends Model {
  // static associate(models) {
  // }
}

Match.init({
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  sequelize: db,
  modelName: 'match',
  underscored: true,
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatches' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatches' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeams' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeams' });

export default Match;
