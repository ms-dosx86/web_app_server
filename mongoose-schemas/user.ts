import { Schema, model, Document } from 'mongoose';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface User extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
});

export const User = model<User>('User', UserSchema);
