import fs from 'fs'
import convert from 'xml-js'
import { AnaliseResult } from './AnaliseResult'


export class XmlAnaliseProcess {
    transformXml(xmlString: string) {
        const jsonResult = convert.xml2json(xmlString, {
            compact: true,
            spaces: 2
        })
        //console.log('objeto', JSON.parse(jsonResult))
        return JSON.parse(jsonResult)
    }
    calcTotal(arrXml) {
        let sum = 0
        arrXml.map((element) => {
            console.log(element)
            let valor = parseFloat(element.nfeProc.NFe.infNFe.total.ICMSTot.vNF._text)
            sum += valor
        })
        return sum
    }
    execute(arrFiles) {
        let arrXmls = [];
        arrFiles.map((element) => {
            let data = fs.readFileSync(element.path, 'utf-8')
            const xmlObj = this.transformXml(data)
            //console.log(xmlObj)
            arrXmls.push(xmlObj)
        })
        const total = this.calcTotal(arrXmls)
        const obj = new AnaliseResult(total)
        return obj
    }
}