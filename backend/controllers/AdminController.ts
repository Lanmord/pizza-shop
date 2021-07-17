import express from 'express';
// import { validationResult } from 'express-validator';
import { AdminModel } from '../models/AdminModel';
import { generateMD5 } from '../utils/generateHash';
import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken';

// const isValidId = mongoose.Types.ObjectId.isValid;

class AdminController {
  async create(req: any, res: express.Response): Promise<void> {
    try {
      await AdminModel.create({
        username: req.body.username,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
      }).then((user) =>
        res.json({
          status: 'success',
          data: user,
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
}

export const AdminCtrl = new AdminController();
