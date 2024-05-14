import express, { Router } from 'express'
import { XmlAnaliseController } from './controllers/XmlAnaliseController';

const app = express()
const routes = Router();

routes.get('/xml', new XmlAnaliseController().handle)
export {routes}