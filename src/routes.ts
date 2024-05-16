import express, { Router } from 'express'
import { XmlAnaliseController } from './controllers/XmlAnaliseController';
import multer from 'multer'
import multerConfig from './config/multer'
import { GenerateCommandController } from './controllers/GenerateCommandController';
import { ReportController } from './controllers/ReportController';
const app = express()
const routes = Router();

const upload = multer(multerConfig)
routes.post('/xml',
    upload.array('xml'),
    new XmlAnaliseController().handle)

routes.post('/comando',
    upload.array('xml'),
    new GenerateCommandController().handle
)

routes.post('/report',
    upload.array('xml'),
    new ReportController().handle
)
export { routes }