import {
  combineReducers
} from 'redux';
import filters from './filters.js';
import pizzas from './pizzas.js';
import cart from './cart.js';
import modal from './modal.js';
import auth from './auth.js';

const rootReducer = combineReducers({
  filters,
  pizzas,
  cart,
  modal,
  auth
});

export default rootReducer;