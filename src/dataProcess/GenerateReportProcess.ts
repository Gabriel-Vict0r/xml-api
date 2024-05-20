import { deleteFiles } from "../utils/deleteTmpFiles";
import { TransformToObjProcess } from "./TransformToObjProcess";


interface INote {
    key?: string;
    value?: number;
    date?: string;
    serie?: string;
    noteNumber?: string;
    status?: string;
    protocol?: string;
    client?: string;
}
export class GenerateReportProcess {
    listReport(arrXmls) {
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Araguaina',
        });
        let arrObj = []
        arrXmls.map((element) => {
            let obj: INote = {};
            obj.key = element.nfeProc.protNFe.infProt.chNFe._text;
            obj.value = parseFloat(element.nfeProc.NFe.infNFe.total.ICMSTot.vNF._text);
            obj.date = dateFormat.format(new Date(element.nfeProc.NFe.infNFe.ide.dhEmi._text));
            obj.serie = element.nfeProc.NFe.infNFe.ide.serie._text;
            obj.noteNumber = element.nfeProc.NFe.infNFe.ide.nNF._text;
            obj.status = element.nfeProc.protNFe.infProt.cStat._text;
            obj.protocol = Object.hasOwn(element.nfeProc.protNFe.infProt, 'nProt') ? element.nfeProc.protNFe.infProt.nProt._text : "SEM PROTOCOLO";
            obj.client = (Object.hasOwn(element.nfeProc.NFe.infNFe, 'dest') ? element.nfeProc.NFe.infNFe.dest.xNome._text : 'VENDA AO CONSUMIDOR');
            arrObj.push(obj)
        })
        return arrObj;
    }
    execute(arrFiles) {
        const service = new TransformToObjProcess();
        const arrXmls = service.readTransformFiles(arrFiles);
        const result = this.listReport(arrXmls)
        return result;
    }
}