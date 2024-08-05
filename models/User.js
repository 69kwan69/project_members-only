import { model, Schema } from 'mongoose';

const User = model(
  'User',
  new Schema({
    username: String,
    password: String,
    role: String,
  })
);

export default User;
