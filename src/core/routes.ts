import bodyParser from 'body-parser';
import express from 'express';
import socket from 'socket.io';

import { UserController, DialogController, MessageController } from '../controllers';
import { updateLastSeen, checkAuth } from '../middlewares';
import { loginValidation } from '../helpers/validations';

const createRoutes = (app: express.Express, io: socket.Server) => {
  const User = new UserController();
  const Dialog = new DialogController();
  const Messages = new MessageController();

  app.use(bodyParser.json());
  app.use(updateLastSeen);
  app.use(checkAuth);

  app.get('/user/me', User.getMe)
  app.get('/user/:id', User.show);
  app.delete('/user/:id', User.delete);
  app.post('/user/registration', User.create);
  app.post('/user/login', loginValidation, User.login);

  app.get('/dialogs', Dialog.index);
  app.delete('/dialogs/:id', Dialog.delete);
  app.post('/dialogs', Dialog.create);

  app.get('/messages', Messages.index);
  app.post('/messages', Messages.create);
  app.delete('/messages', Messages.delete);
}

export default createRoutes;
