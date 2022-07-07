import { Router } from 'express';
import Controller from '../controllers/team.controller';
// import validateToken from '../middlewares/validateToken.middleware';

const routes = Router();

const controller = new Controller();

routes.get('/', controller.getAll);

export default routes;
