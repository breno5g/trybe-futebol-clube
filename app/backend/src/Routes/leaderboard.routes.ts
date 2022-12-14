import { Router } from 'express';
import Controller from '../controllers/leaderboard.controller';
// import validateToken from '../middlewares/validateToken.middleware';

const routes = Router();

const controller = new Controller();

routes.get('/home', controller.getHome);
routes.get('/away', controller.getAway);

export default routes;
