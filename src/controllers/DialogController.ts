import express from 'express';
import { DialogModel } from '../models';

class DialogController {

  index(req: express.Request, res: express.Response) {
    const authorId: string = req.params.id;
    DialogModel.find({ author: authorId })
      .populate(['author', 'partner'])
      .exec(function(err, dialogs) {
        if (err) {
          return res.status(404).json({
            message: "Dialogs not found"
          })
        }
        return res.json(dialogs);
      })
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      author: req.body.author,
      partner: req.body.partner,
    };
  
    const dialog = new DialogModel(postData);
    dialog.save().then((obj: any) => {
      res.json(obj);
    }).catch(reason => {
      res.json(reason);
    });
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    DialogModel.findOneAndRemove({ _id: id }).then(dialog => {
      if (dialog) {
        res.json({
          message: `Dialog removed`
        })
      }
    }).catch(() => {
      res.json({
        message: "Dialog not found"
      })
    });
  }

}

export default DialogController;
