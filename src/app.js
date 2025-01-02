import routes from './routes';

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

class App {

  constructor() {
    this.server = express();

    mongoose.connect(process.env.MONGO_URI);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); 
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;