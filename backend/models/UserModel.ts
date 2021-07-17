import { model, Schema } from 'mongoose';

// export interface IUserModel {
//   _id?: string;
//   email: string;
//   fullname: string;
//   password: string;
//   confirmed?: boolean;
//   confirm_hash: string;
// }

const UserSchema = new Schema({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  fullname: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirm_hash: {
    required: true,
    type: String,
  },
  orders: {
    required: false,
    type: [Schema.Types.ObjectId],
  },
  isAdmin: {
    default: false,
    required: false,
    type: Boolean,
  },
});

UserSchema.set('toJSON', {
  transform: function (_: any, obj: { password: any; confirm_hash: any }) {
    delete obj.password;
    delete obj.confirm_hash;
    return obj;
  },
});

export const UserModel = model('User', UserSchema);
