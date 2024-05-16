
import convert from 'xml-js'
import fs from 'fs'


export class TransformToObjProcess {
    transformXml(xmlString: string) {
        const jsonResult = convert.xml2json(xmlString, {
            compact: true,
            spaces: 2
        })
        //console.log('objeto', JSON.parse(jsonResult))
        return JSON.parse(jsonResult)
    }

    readTransformFiles(arrFiles) {
        let arrXmls = [];
        arrFiles.map((element) => {
            let data = fs.readFileSync(element.path, 'utf-8')
            const xmlObj = this.transformXml(data)
            //console.log(xmlObj)
            arrXmls.push(xmlObj)
        })
        return arrXmls;
    }
}