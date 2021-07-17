import { model, Schema } from 'mongoose';
import { mongoose } from '../core/db';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrderSchema = new Schema(
  {
    comment: {
      required: true,
      type: String,
    },
    location: {
      required: true,
      type: String,
    },
    payment_type: {
      required: true,
      type: String,
    },
    total_price: {
      required: true,
      type: Number,
    },
    items: {
      required: true,
      type: Schema.Types.Mixed,
    },
    status: {
      default: 1,
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

OrderSchema.plugin(AutoIncrement, { inc_field: 'order_id' });

export const OrderModel = model('Order', OrderSchema);
