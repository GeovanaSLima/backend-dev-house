import express from 'express';
import routes from './routes';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class App {

  constructor() {
    this.server = express();

    const client = new MongoClient(process.env.MONGO_URI);

    client.connect();

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