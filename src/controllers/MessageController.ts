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
    const userId = '5e00ba130763d51e701e0945';

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

  // delete(req: express.Request, res: express.Response) {
  //   const id: string = req.params.id;
  //   MessageModel.findOneAndRemove({ _id: id }).then(dialog => {
  //     if (dialog) {
  //       res.json({
  //         message: `Dialog removed`
  //       })
  //     }
  //   }).catch(() => {
  //     res.json({
  //       message: "Dialog not found"
  //     })
  //   });
  // }

}

export default MessageController;
