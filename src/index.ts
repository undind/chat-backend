import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import User from './schemas/User';

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.post('/create', (req: any, res: any) => {
  const postData = {
    email: req.body.email,
    fullname: req.body.fullname,
    password: req.body.password
  };

  const user = new User(postData);
  user.save().then((obj: any) => {
    res.json(obj);
  }).catch(reason => {
    res.json(reason);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
