import { Request, Response } from "express";
import { TransformToObjProcess } from "../dataProcess/TransformToObjProcess";
import { GenerateReportProcess } from "../dataProcess/GenerateReportProcess";


export class ReportController {
    handle(req: Request, res: Response) {
        const files = req.files
        const filesArr = files as unknown as Array<Express.Multer.File>;

        const service = new GenerateReportProcess();
        const result = service.execute(filesArr)
        return result;
    }
}