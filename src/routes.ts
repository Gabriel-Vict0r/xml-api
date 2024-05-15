import express, { Router } from 'express'
import { XmlAnaliseController } from './controllers/XmlAnaliseController';
import multer from 'multer'
import multerConfig from './config/multer'
const app = express()
const routes = Router();

const upload = multer(multerConfig)
routes.post('/xml',
    upload.array('xml'),
    new XmlAnaliseController().handle)
export {routes}