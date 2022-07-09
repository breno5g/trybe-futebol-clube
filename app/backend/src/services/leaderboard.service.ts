/* eslint-disable max-lines-per-function */
import { draws, favor, loses, own, sortLeaderboard, totalPoints, victories,
} from '../utils/leaderboard';
import TeamModel from '../database/models/team';
import match from '../database/models/match';

const initInfo = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

export default class Service {
  private model = TeamModel;

  getMatches = async (local: string) => {
    const data = await this.model.findAll({
      include: {
        model: match,
        as: local,
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
        where: { inProgress: false },
      },
      attributes: { exclude: ['id'] },
    });
    return data;
  };

  calcPoints = (matches: any, local: string) => {
    const points = matches.reduce((acc: any, curr: any) => {
      const info = { ...initInfo };
      info.name = curr.teamName;
      info.totalGames = curr[local].length;
      info.goalsOwn = own(curr, local);
      info.goalsFavor = favor(curr, local);
      info.totalDraws = draws(curr, local);
      info.totalLosses = loses(curr, local);
      info.totalVictories = victories(curr, local);
      info.goalsBalance = info.goalsFavor - info.goalsOwn;
      info.totalPoints = totalPoints(curr, local);
      acc.push(info);
      return acc;
    }, []);
    return points;
  };

  getAllMatchesPoints = async () => {
    const homeMatches = await this.getMatches('homeMatches');
    const awayMatches = await this.getMatches('awayMatches');
    const homeMatchesPoints = this.calcPoints(homeMatches, 'homeMatches');
    const awayMatchesPoints = this.calcPoints(awayMatches, 'awayMatches');

    return [homeMatchesPoints, awayMatchesPoints];
  };

  getHome = async () => {
    const allMatches = await this.getAllMatchesPoints();
    return sortLeaderboard(allMatches[0].map((matche: any) => ({ ...matche,
      efficiency: Number(((matche.totalPoints / (matche.totalGames * 3)) * 100).toFixed(2)),
    })));
  };

  getAway = async () => {
    const allMatches = await this.getAllMatchesPoints();

    return sortLeaderboard(allMatches[1].map((matche: any) => ({ ...matche,
      efficiency: Number(((matche.totalPoints / (matche.totalGames * 3)) * 100).toFixed(2)),
    })));
  };

  // overallLeaderboard = async () => {
  //   const allMatches = await this.getAllMatchesPoints();
  //   // const data = allMatches.reduce((acc: any, curr: any) => {
  //   //   if (!acc[curr.name]) {
  //   //     acc[curr.name] = { ...curr };
  //   //   } else {
  //   //     acc[curr.name].totalPoints += curr.totalPoints;
  //   //     console.log(acc[curr.name]);
  //   //     acc[curr.name].totalGames += curr.totalGames;
  //   //     acc[curr.name].totalVictories += curr.totalVictories;
  //   //     acc[curr.name].totalDraws += curr.totalDraws;
  //   //     acc[curr.name].totalDraws += curr.totalDraws;
  //   //     acc[curr.name].totalLosses += curr.totalLosses;
  //   //     acc[curr.name].goalsFavor += curr.goalsFavor;
  //   //     acc[curr.name].goalsOwn += curr.goalsOwn;
  //   //     acc[curr.name].goalsBalance += curr.goalsBalance;
  //   //   }
  //   //   return acc;
  //   // }, {});
  //   // return Object.values(data).map((matche: any) => ({ ...matche,
  //   //   efficiency: Number(((matche.totalPoints / (matche.totalGames * 3)) * 100).toFixed(2)),
  //   // })).sort((a, b) => b.totalPoints - a.totalPoints);
  //   return sortLeaderboard(allMatches.map((matche: any) => ({ ...matche,
  //     efficiency: Number(((matche.totalPoints / (matche.totalGames * 3)) * 100).toFixed(2)),
  //   })));
  // };
}
