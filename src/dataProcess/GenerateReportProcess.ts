import { TransformToObjProcess } from "./TransformToObjProcess";


interface INote {
    key: string;
    value: number;
    date: string;
}
export class GenerateReportProcess {
    listReport(arrXmls) {
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Araguaina',
        });
        let arrObj = []
        const arrNotes = arrXmls.map((element, i) => {
            let obj: INote;
            obj.key = element.nfeProc.protNFe.infProt.chNFe._text;
            obj.value = parseFloat(element.nfeProc.NFe.infNFe.total.ICMSTot.vNF._text);
            obj.date = dateFormat.format(new Date(element.nfeProc.NFe.infNFe.ide.dhEmi._text));
            obj.serie = element.nfeProc.NFe.infNFe.ide.serie._text;
            obj.noteNumber = element.nfeProc.NFe.infNFe.ide.nNF._text;
            obj.status = element.nfeProc.protNFe.infProt.cStat._text;
            obj.protocol = element.nfeProc.protNFe.infProt;
            obj.client = (Object.hasOwn(element.nfeProc.NFe.infNFe, 'dest') ? element.nfeProc.NFe.infNFe.dest.xNome._text : 'VENDA AO CONSUMIDOR');
        })
        return arrNotes;
    }

    execute(arrFiles) {
        const service = new TransformToObjProcess();
        const arrXmls = service.readTransformFiles(arrFiles);
        const result = this.listReport(arrXmls)
        return result;
    }
}