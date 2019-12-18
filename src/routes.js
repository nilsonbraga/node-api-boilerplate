import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
const routes = new Router();

// User Routes
routes.post('/users', UserController.store);
routes.get('/users', UserController.findAll);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

//Session Route
routes.post('/sessions', SessionController.store);

export default routes;
