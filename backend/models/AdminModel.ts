import { model, Schema } from 'mongoose';

const AdminSchema = new Schema({
  username: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  isAdmin: {
    default: true,
    required: false,
    type: Boolean,
  },
});

AdminSchema.set('toJSON', {
  transform: function (_: any, obj: { password: any; confirm_hash: any }) {
    delete obj.password;
    return obj;
  },
});

export const AdminModel = model('Admin', AdminSchema);
