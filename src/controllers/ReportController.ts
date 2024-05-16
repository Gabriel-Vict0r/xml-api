import { Request, Response } from "express";
import { TransformToObjProcess } from "../dataProcess/TransformToObjProcess";


export class ReportController {
    handle(req: Request, res: Response) {
        const filesArr = req.files
        const service = new TransformToObjProcess();
        const arrXmls = service.readTransformFiles(filesArr);
    }
}