import { Request, Response } from "express";
import convert from 'xml-js'
import fs from 'fs'
import { XmlAnaliseProcess } from "../dataProcess/XmlConvertProcess";

export class XmlAnaliseController {
    handle(req: Request, res: Response) {
        const files = req.files
        const filesArr = files as unknown as Array<Express.Multer.File>

        const service = new XmlAnaliseProcess();
        const result = service.execute(filesArr);
        return res.status(200).json(result)
    }
}