import express from 'express';
import { UserModel } from '../models';

export default (_: express.Request, __: express.Response, next: express.NextFunction) => {
  UserModel.findOneAndUpdate({
    _id: '5e00ba130763d51e701e0945'
  }, {
    last_seen: new Date()
  }, {
    new: true
  }, 
    () => {}
  )
  next()
}