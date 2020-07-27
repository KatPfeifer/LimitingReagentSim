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

    getAname(){
        return this.nameA;
    }
    getAmw(){
        return this.mwA;
    }
    getAco(){
        return this.coA;
    }

    getBname(){
        return this.nameB;
    }
    getBmw(){
        return this.mwB;
    }
    getBco(){
        return this.coB;
    }
    
    getCname(){
        return this.nameC;
    }
    getCmw(){
        return this.mwC;
    }
    getCco(){
        return this.coC;
    }

    getDname(){
        return this.nameD;
    }
    getDmw(){
        return this.mwD;
    }
    getDco(){
        return this.coD;
    }
}