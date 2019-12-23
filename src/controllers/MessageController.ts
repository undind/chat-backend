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

  // create(req: express.Request, res: express.Response) {
  //   const postData = {
  //     author: req.body.author,
  //     partner: req.body.partner,
  //   };
  
  //   const dialog = new MessageModel(postData);
  //   dialog.save().then((obj: any) => {
  //     res.json(obj);
  //   }).catch(reason => {
  //     res.json(reason);
  //   });
  // }

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
