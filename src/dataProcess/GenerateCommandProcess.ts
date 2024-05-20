import { deleteFiles } from "../utils/deleteTmpFiles";
import { TransformToObjProcess } from "./TransformToObjProcess";


export class GenerateCommandProcess {

    mountCommand(arrXmls) {
        const objComand = { comando: '' }
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Araguaina',
        })
        const start = "SELECT xN.*, v.numnota, v.datvend, v.servend, v.stavend, v.vlrnota,  (v.vlrnota <> xN.valor) as diferenca FROM ("
        const mid =
            arrXmls.map((element, index) => {
                let line = `SELECT CAST( '${element.nfeProc.protNFe.infProt.chNFe._text}' AS VARCHAR(44)) AS CHAVE,CAST( ${element.nfeProc.NFe.infNFe.total.ICMSTot.vNF._text} AS NUMERIC(12,2)) AS VALOR,CAST( '${dateFormat.format(new Date(element.nfeProc.NFe.infNFe.ide.dhEmi._text))}' AS DATE) AS DATA,CAST( '${element.nfeProc.NFe.infNFe.ide.serie._text}' AS varchar(5)) AS SERIE, CAST( ${element.nfeProc.NFe.infNFe.ide.nNF._text} AS BIGINT) AS NUMERO`;
                return (index === 0 ? line : ' UNION ALL ' + line)

            })
        const end = " ) xN  LEFT JOIN tab_vend v on v.chv_nfe = xN.chave where (v.vlrnota <> xN.valor) is true"
        objComand.comando = start + mid.join(' ') + end
        //console.log(objComand.comando)
        return objComand;
    }
    execute(filesArr: Array<Express.Multer.File>) {
        const service = new TransformToObjProcess();
        const arrXmls = service.readTransformFiles(filesArr);
        const comand = this.mountCommand(arrXmls);

        return comand
    }
}