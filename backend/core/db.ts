import mongoose from 'mongoose';
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/nravitzza_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

export { db, mongoose };
