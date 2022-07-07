import { Router } from 'express';
import Controller from '../controllers/user.controller';

const routes = Router();

const controller = new Controller();

routes.post('/login', controller.login);

export default routes;
