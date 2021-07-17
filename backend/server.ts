import dotenv from 'dotenv';
dotenv.config();

import { registerValidations } from './validations/register';
import express from 'express';
import { UserCtrl } from './controllers/UserController';
import './core/db';
import { passport } from './core/passport';
import { PizzaCtrl } from './controllers/PizzaController';
import { OrderCtrl } from './controllers/OrderController';
import { AdminCtrl } from './controllers/AdminController';
import { upload } from './utils/upload';
// import formidableMiddleware from 'express-formidable';

import cors from 'cors';

const app = express();

// app.use(formidableMiddleware());
app.use('/uploads/', express.static('uploads'));
app.use(express.json());
app.use(passport.initialize());

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));
//работа с админами
app.get('/admins/me', passport.authenticate('jwt-admin'), AdminCtrl.getUserInfo);
app.post('/admins/register', AdminCtrl.create);
app.post('/admins/login', passport.authenticate('local-admin'), AdminCtrl.afterLogin);

//работа с пользователями
app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt-user'), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);
app.post('/users/:id', UserCtrl.update);

app.post('/auth/register', registerValidations, UserCtrl.create);
app.get('/auth/verify', UserCtrl.verify);
app.post('/auth/login', passport.authenticate('local-user'), UserCtrl.afterLogin);

//работа с пиццами
app.get('/pizzas', PizzaCtrl.getPizzas);
app.get('/pizzas/:id', PizzaCtrl.show);
app.delete('/pizzas/:id', PizzaCtrl.delete);
app.patch('/pizzas/:id', upload.single('image'), PizzaCtrl.update);
app.post('/pizzas', upload.single('image'), PizzaCtrl.create);

//работа с отчётами
app.get('/orders', OrderCtrl.index);
app.get('/orders/:id', OrderCtrl.show);
app.patch('/orders/:id', OrderCtrl.update);
app.get('/ordersfind', OrderCtrl.find);
app.post('/orders', OrderCtrl.create);
app.post('/orders/findordersbyid', OrderCtrl.findOrdersById);

app.listen(process.env.PORT, () => {
  console.log('SERVER HAS BEEN STARTED!');
});
