import { model, Schema } from 'mongoose';

const PizzaSchema = new Schema({
  imageUrl: {
    unique: true,
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  types: {
    required: true,
    type: [Number],
  },
  sizes: {
    required: true,
    type: [Number],
  },
  price: {
    required: true,
    type: Number,
  },
  category: {
    required: true,
    type: Number,
  },
  rating: {
    required: true,
    type: Number,
  },
});

export const PizzaModel = model('Pizza', PizzaSchema);
