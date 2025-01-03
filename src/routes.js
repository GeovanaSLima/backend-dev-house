import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import ReservationController from './controllers/ReservationController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

routes.post("/houses", upload.single('thumbnail'), HouseController.store);
routes.get("/houses", HouseController.index);
routes.delete("/houses", HouseController.destroy);
routes.put("/houses/:house_id", upload.single('thumbnail'), HouseController.update);

routes.get("/dashboard", DashboardController.show);

routes.post("/houses/:house_id/reserve", ReservationController.store);

export default routes;