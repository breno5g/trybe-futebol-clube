import { Router } from 'express';

import user from './user.routes';
import team from './team.routes';
import match from './match.routes';

const routes = Router();

routes.use('/login', user);
routes.use('/teams', team);
routes.use('/matches', match);

export default routes;
