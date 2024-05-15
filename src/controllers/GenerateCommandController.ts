import { Request, Response } from 'express'
import { GenerateCommandProcess } from '../dataProcess/GenerateCommandProcess'

export class GenerateCommandController {
    handle(req: Request, res: Response) {
        const files = req.files
        const filesArr = files as unknown as Array<Express.Multer.File>

        const service = new GenerateCommandProcess();
        const result = service.execute()

        return res.status(200).json(result)
    }
}