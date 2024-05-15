
interface INote {
    [key: string]: string;
}
export class AnaliseResult {
    total: number;
    canceled: INote;
    withoutProt: INote;
    wrongDate: INote;

    constructor(total, canceled, without, wrongDate) {
        this.total = total
        this.canceled = canceled
        this.withoutProt = without
        this.wrongDate = wrongDate
    }
}