import express from 'express';
import { MessageModel } from '../models';

class MessageController {

  index(req: express.Request, res: express.Response) {
    const dialogId: string = req.query.dialog;

    MessageModel.find({ dialog: dialogId })
      .populate(['dialog'])
      .exec(function(err, messages) {
        if (err) {
          return res.status(404).json({
            message: "Messages not found"
          })
        }
        return res.json(messages);
      })
  }

  create(req: express.Request, res: express.Response) {
    const userId = '5e00ba410763d51e701e0947';

    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: userId
    };
  
    const message = new MessageModel(postData);

    message.save().then((obj: any) => {
      res.json(obj);
    }).catch(reason => {
      res.json(reason);
    });
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.query.id;
    MessageModel.findOneAndRemove({ _id: id }).then(message => {
      if (message) {
        res.json({
          message: `Message removed`
        })
      }
    }).catch(() => {
      res.json({
        message: "Message not found"
      })
    });
  }

}

export default MessageController;