import express from 'express';
import mongoose from 'mongoose';
import { OrderModel } from '../models/OrderModel';

const isValidId = mongoose.Types.ObjectId.isValid;

class orderController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const orders = await OrderModel.find({}).exec();

      res.json({
        status: 'success',
        data: orders,
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
      const orderId = req.params.id;

      if (!isValidId(orderId)) {
        res.status(400).send();
        return;
      }
      const order = await OrderModel.findById(orderId).exec();

      if (!order) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: order,
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
      const orderId = req.params.id;

      if (!isValidId(orderId)) {
        res.status(400).send();
        return;
      }

      await OrderModel.findByIdAndUpdate(orderId, req.body, (err, res) => {
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

  async find(req: express.Request, res: express.Response): Promise<void> {
    try {
      const orders = await OrderModel.find(req.query).exec();

      if (!orders) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async create(req: any, res: express.Response): Promise<void> {
    try {
      await OrderModel.create(req.body).then((order) =>
        res.json({
          status: 'success',
          data: order,
        }),
      );
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async findOrdersById(req: express.Request, res: express.Response): Promise<void> {
    try {
      const ordersId: [] = req.body;

      for (let orderId of ordersId) {
        if (!isValidId(orderId)) {
          res.status(400).send('Один из ID заказов некорректен');
          return;
        }
      }

      const orders = await OrderModel.find({
        _id: {
          $in: ordersId,
        },
      })
        .sort({ createdAt: -1 })
        .exec();

      if (!orders) {
        res.status(404).send('Заказы не найдены');
        return;
      }

      res.json({
        status: 'success',
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export const OrderCtrl = new orderController();
