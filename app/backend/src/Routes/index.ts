import { Router } from 'express';

import user from './user.routes';
import team from './team.routes';
import match from './match.routes';
import leaderboard from './leaderboard.routes';

const routes = Router();

routes.use('/login', user);
routes.use('/teams', team);
routes.use('/matches', match);
routes.use('/leaderboard', leaderboard);

export default routes;
