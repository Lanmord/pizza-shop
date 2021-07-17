import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/UserModel';
import { generateMD5 } from '../utils/generateHash';
import { Document } from 'mongoose';
import { AdminModel } from '../models/AdminModel';

passport.use(
  'local-user',
  new LocalStrategy(async function (username, password, done): Promise<void> {
    try {
      const user = await UserModel.findOne({ email: username }).exec();
      console.log(user);

      if (!user) {
        return done(null, false);
      }

      if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  }),
);

passport.use(
  'local-admin',
  new LocalStrategy(async function (username, password, done): Promise<void> {
    try {
      const user = await AdminModel.findOne({ username }).exec();

      if (!user) {
        return done(null, false);
      }

      if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  }),
);

passport.serializeUser(function (user: { _id?: any; isAdmin?: boolean }, done) {
  done(null, { _id: user._id, isAdmin: user.isAdmin });
});

passport.deserializeUser(function (user: { _id?: any; isAdmin?: boolean }, done) {
  if (user.isAdmin) {
    AdminModel.findById(user._id, function (err: any, user: boolean | Express.User) {
      return done(err, user);
    });
  } else {
    UserModel.findById(user._id, function (err: any, user: boolean | Express.User) {
      return done(err, user);
    });
  }
});

passport.use(
  'jwt-user',
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    },
    async (payload: { data: Document }, done) => {
      try {
        const user = await UserModel.findById(payload.data._id).exec();
        if (user) {
          return done(null, user);
        } else {
          return done(null, null);
        }
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  'jwt-admin',
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromHeader('token2'),
    },
    async (payload: { data: Document }, done) => {
      try {
        const user = await AdminModel.findById(payload.data._id).exec();
        if (user) {
          return done(null, user);
        } else {
          return done(null, null);
        }
      } catch (error) {
        done(error);
      }
    },
  ),
);

export { passport };
