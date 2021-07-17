import express from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from '../models/UserModel';
import { generateMD5 } from '../utils/generateHash';
import sendEmail from '../utils/sendEmail';
import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken';

const isValidId = mongoose.Types.ObjectId.isValid;

class UserController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();

      res.json({
        status: 'success',
        data: users,
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
      const userId = req.params.id;

      if (!isValidId(userId)) {
        res.status(400).send();
        return;
      }
      const users = await UserModel.findById(userId).exec();

      if (!users) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: users,
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
      const errors = validationResult(req);
      const generatedHASH = generateMD5(String(process.env.SECRET_KEY));
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }

      await UserModel.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        confirm_hash: generatedHASH,
      }).then((user) =>
        res.json({
          status: 'success',
          data: user,
        }),
      );
      sendEmail({
        emailFrom: 'admin@nravitzza.com',
        emailTo: req.body.email,
        subject: 'Подтверждение почты для пиццерии Nravitzza',
        html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${process.env.PORT}/auth/verify?hash=${generatedHASH}">по этой ссылке</a>`,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;
      if (!hash) {
        res.status(400).send();
        return;
      }

      const users = await UserModel.findOne({ confirm_hash: hash }).exec();

      users.confirmed = true;

      await users.save().then(() =>
        res.status(201).json({
          status: 'success',
          data: users,
        }),
      );
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as Document).toJSON() : undefined;
      res.json({
        status: 'success',
        data: {
          ...user,
          token: jwt.sign({ data: req.user }, String(process.env.SECRET_KEY), { expiresIn: '30d' }),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as Document).toJSON() : undefined;
      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  // async pushOrder(req: express.Request, res: express.Response): Promise<void> {
  //   try {
  //     const userId = req.params.id;
  //     const orderId = req.body.order;

  //     if (!isValidId(userId)) {
  //       res.status(400).send('invalid user id');
  //       return;
  //     } else if (!isValidId(orderId)) {
  //       res.status(400).send('invalid order id');
  //       return;
  //     }
  //     const users = await UserModel.findById(userId).exec();

  //     if (!users) {
  //       res.status(404).send();
  //       return;
  //     }
  //     users.orders.push(orderId);
  //     users.save();
  //     res.send();
  //   } catch (error) {
  //     res.status(500).json({
  //       status: 'error',
  //       message: error.message,
  //     });
  //   }
  // }

  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidId(userId)) {
        res.status(400).send('invalid user id');
        return;
      }

      await UserModel.findByIdAndUpdate(userId, req.body, (err, res) => {
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
}

export const UserCtrl = new UserController();
