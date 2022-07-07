import { Router } from 'express';

import user from './user.routes';
import team from './team.routes';

const routes = Router();

routes.use('/login', user);
routes.use('/teams', team);

export default routes;
