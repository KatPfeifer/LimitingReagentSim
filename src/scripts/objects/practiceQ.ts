export default class practiceQ {
    private nameA: string;
    private mwA: number;
    private nameB: string;
    private mwB: number;
    private nameC: string;
    private mwC: number;
    private nameD: string;
    private mwD: number;
    private coA: number;
    private coB: number;
    private coC: number;
    private coD; number;

    //name = name of compound
    //mw = molecular weight of compound

    constructor(Aname: string, Amw: number, Bname: string, Bmw: number, Cname: string, Cmw: number, Dname: string, Dmw: number, Aco: number, Bco: number, Cco: number, Dco: number){
        this.nameA=Aname;
        this.mwA=Amw;
        this.nameB=Bname;
        this.mwB=Bmw;
        this.nameC=Cname;
        this.mwC=Cmw;
        this.nameD=Dname;
        this.mwD=Dmw;
        this.coA=Aco;
        this.coB=Bco;
        this.coC=Cco;
        this.coD=Dco;
    }

    /**
     * Turns the numbers in the string into subscripts.
     * 
     * Basically stolen from: https://stackoverflow.com/a/41538625/1718155
     * 
     * @param text The text to transform
     */
    makeNumbersSubscripts(text: string): string {
        var result = "";
        for (var i=0; i<text.length; i++) {
            //  Get the code of the current character
            var code = text.charCodeAt(i);
            if (code >= 48 && code <= 57) {
                //  If it's between "0" and "9", offset the code ...
                result += String.fromCharCode(code + 8272);
            } else {
                //   ... otherwise keep the character
                result += text[i];
            }
        }
        console.log(text, result);
        return result;
    }

    getAname(){
        return this.makeNumbersSubscripts(this.nameA);
    }
    getAmw(){
        return this.mwA;
    }
    getAco(){
        return this.coA;
    }

    getBname(){
        return this.makeNumbersSubscripts(this.nameB);
    }
    getBmw(){
        return this.mwB;
    }
    getBco(){
        return this.coB;
    }
    
    getCname(){
        return this.makeNumbersSubscripts(this.nameC);
    }
    getCmw(){
        return this.mwC;
    }
    getCco(){
        return this.coC;
    }

    getDname(){
        return this.makeNumbersSubscripts(this.nameD);
    }
    getDmw(){
        return this.mwD;
    }
    getDco(){
        return this.coD;
    }
}