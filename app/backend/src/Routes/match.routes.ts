import { Router } from 'express';
import Controller from '../controllers/match.controller';

const routes = Router();

const controller = new Controller();

routes.get('/', controller.getAll);

export default routes;
