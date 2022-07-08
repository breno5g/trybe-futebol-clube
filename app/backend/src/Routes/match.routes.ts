import { Router } from 'express';
import Controller from '../controllers/match.controller';
import validateMatchBody from '../middlewares/validataMatchBody.middleware';

const routes = Router();

const controller = new Controller();

routes.get('/', controller.getAll);
routes.post('/', validateMatchBody, controller.create);
routes.patch('/:id/finish', controller.finish);

export default routes;
