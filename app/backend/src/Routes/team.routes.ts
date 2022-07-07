import { Router } from 'express';
import Controller from '../controllers/team.controller';
// import validateToken from '../middlewares/validateToken.middleware';

const routes = Router();

const controller = new Controller();

routes.get('/', controller.getAll);
routes.get('/:id', controller.getById);

export default routes;
