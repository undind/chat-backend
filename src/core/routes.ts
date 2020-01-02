import bodyParser from 'body-parser';
import express from 'express';
import socket from 'socket.io';

import { UserController, DialogController, MessageController } from '../controllers';
import { updateLastSeen, checkAuth } from '../middlewares';
import { loginValidation, registerValidation } from '../helpers/validations';

const createRoutes = (app: express.Express, io: socket.Server) => {
  const UserCtrl = new UserController(io);
  const DialogCtrl = new DialogController(io);
  const MessagesCtrl = new MessageController(io);

  app.use(bodyParser.json());
  app.use(updateLastSeen);
  app.use(checkAuth);

  app.get('/user/me', UserCtrl.getMe);
  app.get('/user/verify', UserCtrl.verify);
  app.post('/user/signup', registerValidation, UserCtrl.create);
  app.post('/user/signin', loginValidation, UserCtrl.login);
  app.get('/user/:id', UserCtrl.show);
  app.delete('/user/:id', UserCtrl.delete);

  app.get('/dialogs', DialogCtrl.index);
  app.delete('/dialogs/:id', DialogCtrl.delete);
  app.post('/dialogs', DialogCtrl.create);

  app.get('/messages', MessagesCtrl.index);
  app.post('/messages', MessagesCtrl.create);
  app.delete('/messages', MessagesCtrl.delete);
}

export default createRoutes;
