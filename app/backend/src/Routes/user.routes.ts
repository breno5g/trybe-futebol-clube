import { Router } from 'express';
import validateLoginBody from '../middlewares/validateLoginBody.middleware';
import Controller from '../controllers/user.controller';

const routes = Router();

const controller = new Controller();

routes.post('/login', validateLoginBody, controller.login);
// routes.post('/login/validate', validateLoginBody, controller.login);

export default routes;
