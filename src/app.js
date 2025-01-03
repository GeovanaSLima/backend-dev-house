import routes from './routes';

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

dotenv.config();

class App {

  constructor() {
    this.server = express();

    mongoose.connect(process.env.MONGO_URI);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    this.server.use(express.json()); 
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;