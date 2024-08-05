import { model, Schema } from 'mongoose';

const Message = model(
  'Message',
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      type: String,
      content: String,
      attachment: String,
    },
    { timestamps: true }
  )
);

export default Message;
