import fs from 'fs'
import convert from 'xml-js'
import { AnaliseResult } from './AnaliseResult'
import { TransformToObjProcess } from './TransformToObjProcess';

interface IObjNote {
    noteNumber: string;
    value: number;
}
export class XmlAnaliseProcess {
    extractInfNote(arrNotes) {
        return arrNotes.map((element) => {
            let obj: IObjNote = { noteNumber: '', value: 0 }
            obj.noteNumber = element.nfeProc.NFe.infNFe.ide.nNF._text;
            obj.value = parseFloat(element.nfeProc.NFe.infNFe.total.ICMSTot.vNF._text)
            return obj
        })
    }
    calcTotal(arrXml) {
        let sum = 0
        arrXml.map((element) => {
            //console.log(element)
            let value = parseFloat(element.nfeProc.NFe.infNFe.total.ICMSTot.vNF._text)
            sum += value
        })
        return sum
    }
    cancelNotes(arrXml) {
        const canceled = arrXml.filter((element) => element.nfeProc.protNFe.infProt.cStat._text === '101')
        let justCanceled = canceled.map((element) => {
            let obj: IObjNote = { noteNumber: '', value: 0 }
            obj.noteNumber = element.nfeProc.NFe.infNFe.ide.nNF._text
            obj.value = parseFloat(element.nfeProc.NFe.infNFe.total.ICMSTot.vNF._text)
            return obj;
        })
        //console.log(justCanceled)
        return justCanceled
    }
    xmlWithoutProtocol(arrXml) {
        const withoutProtocol = arrXml.filter((element) => Object.hasOwn(element.nfeProc.protNFe.infProt, 'nProt') === false)
        const justWithoutProt = this.extractInfNote(withoutProtocol)
        return justWithoutProt;
    }
    xmlWrongDate(arrXml) {
        const date = new Date();
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Araguaina',
            month: '2-digit'
        })
        let monthActual = dateFormat.format(date)
        const wrongDate = arrXml.filter((element) => {
            return dateFormat.format(new Date(element.nfeProc.NFe.infNFe.ide.dhEmi._text)) !== monthActual
        })
        const notesWrongDate = this.extractInfNote(wrongDate);
        return notesWrongDate;
    }
    execute(arrFiles) {
        const process = new TransformToObjProcess();
        const arrXmls = process.readTransformFiles(arrFiles)
        console.log(arrXmls)
        const total = this.calcTotal(arrXmls)
        const cancelNotes = this.cancelNotes(arrXmls)
        const withoutProt = this.xmlWithoutProtocol(arrXmls)
        const wrongDate = this.xmlWrongDate(arrXmls)
        const obj = new AnaliseResult(total, cancelNotes, withoutProt, wrongDate)
        return obj
    }
}