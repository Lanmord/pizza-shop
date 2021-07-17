import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import { PizzaModel } from '../models/PizzaModel';

const isValidId = mongoose.Types.ObjectId.isValid;

class PizzaController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const pizzas = await PizzaModel.find({}).exec();

      res.json({
        status: 'success',
        data: pizzas,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const pizzaId = req.params.id;

      if (!isValidId(pizzaId)) {
        res.status(400).send();
        return;
      }
      const pizzas = await PizzaModel.findById(pizzaId).exec();

      if (!pizzas) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: pizzas,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const pizzaId = req.params.id;

      if (!isValidId(pizzaId)) {
        res.status(400).send();
        return;
      }

      let pizza = await PizzaModel.findById(pizzaId).exec();

      if (pizza) {
        fs.unlink(pizza.imageUrl, () => {
          return;
        });
      } else {
        res.status(404).send();
      }

      await pizza.remove((err: any) => {
        if (err) {
          res.status(404).send();
          return;
        } else {
          res.send();
          return;
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const pizzaId = req.params.id;

      if (!isValidId(pizzaId)) {
        res.status(400).send();
        return;
      }

      // if (!req.file) {
      //   // res.status(400).send({
      //   //   status: 'error',
      //   //   data: 'Неверный формат изображения',
      //   // });

      // }

      let data: { [key: string]: any } = {
        name: req.body.name,
        types: JSON.parse(req.body.types),
        sizes: JSON.parse(req.body.sizes),
        price: JSON.parse(req.body.price),
        category: JSON.parse(req.body.category),
        rating: JSON.parse(req.body.rating),
      };

      if (req.file) {
        data.imageUrl = req.file.path;
      }

      await PizzaModel.findByIdAndUpdate(pizzaId, data, (err, res) => {
        if (err) {
          return res.status(400).send();
        }
      });
      res.send();
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async create(req: any, res: express.Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).send({
          status: 'error',
          data: 'Неверный формат изображения',
        });
      }

      let data = {
        name: req.body.name,
        types: JSON.parse(req.body.types),
        sizes: JSON.parse(req.body.sizes),
        price: JSON.parse(req.body.price),
        category: JSON.parse(req.body.category),
        rating: JSON.parse(req.body.rating),
        imageUrl: req.file.path,
      };

      await PizzaModel.create(data).then((pizza) =>
        res.json({
          status: 'success',
          data: pizza,
        }),
      );
    } catch (error) {
      res.status(500).send({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getPizzas(req: express.Request, res: express.Response): Promise<void> {
    try {
      let pizzas = null;

      if (!req.query.category) {
        pizzas = await PizzaModel.find({})
          .sort({ [req.query._sort as string]: req.query._order })
          .exec();

        res.json({
          status: 'success',
          data: pizzas,
        });

        return;
      }

      pizzas = await PizzaModel.find({ category: req.query.category })
        .sort({ [req.query._sort as string]: req.query._order })
        .exec();

      if (!pizzas) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: pizzas,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export const PizzaCtrl = new PizzaController();
