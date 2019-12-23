import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  text: {
    type: string;
    require: boolean;
  };
  unread: {
    type: boolean;
    defaul: boolean;
  };
  dialog: { 
    type: Schema.Types.ObjectId; 
    ref: string;
    require: true;
  };
}

const MessageSchema = new Schema(
  {
    text: { type: String, require: Boolean },
    unread: { type: Boolean, default: false },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog' },
  }, 
  {
    timestamps: true
  }
);

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;