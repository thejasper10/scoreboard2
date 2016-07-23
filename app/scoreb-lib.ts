export class ScorebLib {
    public static fillLeft(str: string, width: number, filler: string) {
        filler = filler.substr(0, 1);
        var ris = str;
        while (ris.length < width) {
            ris = filler + ris;
        }
        return ris;
    }

    public static formatDateSQLite(d: Date) {
        var ris: string;
        var today = new Date();
        var day = this.fillLeft(d.getDate().toString(), 2, "0");
        var month = this.fillLeft((d.getMonth() + 1).toString(), 2, "0");
        var year = d.getFullYear();
        
        ris = year + "-" + month + "-" + day + " " + today.getHours() + ":" + today.getMinutes();
    
        return ris;
    }
}