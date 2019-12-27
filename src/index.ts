import mongoose from 'mongoose';
import express from 'express';
import socket from 'socket.io';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { UserController, DialogController, MessageController } from './controllers';

import { updateLastSeen, checkAuth } from './middlewares';
import { loginValidation } from './helpers/validations';

const app = express();
const http = createServer(app)
const io = socket(http);

dotenv.config();

app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

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

io.on('connection', function(socket: any){
  console.log('CONNECTED!');
}); 

http.listen(process.env.PORT, () => console.log(`Server: http://localhost:${process.env.PORT}`));
