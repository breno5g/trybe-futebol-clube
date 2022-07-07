import { Router } from 'express';
import validateLoginBody from '../middlewares/validateLoginBody.middleware';
import Controller from '../controllers/user.controller';
import validateToken from '../middlewares/validateToken.middleware';

const routes = Router();

const controller = new Controller();

routes.post('/', validateLoginBody, controller.login);
routes.get('/validate', validateToken, controller.validate);

export default routes;
