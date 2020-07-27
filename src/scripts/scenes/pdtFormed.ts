import practiceQ from "../objects/practiceQ";
import button from '../objects/button';

export default class pdtFormed extends Phaser.Scene{
    private questions: any;//figure out how to type this
    private nameA: string;
    private nameB: string;
    private nameC: string;
    private nameD: string;
    private mwA: number;
    private mwB: number;
    private mwC: number;
    private mwD: number;
    private coA: number;
    private coB: number;
    private coC: number;
    private coD: number;
    private gA: number;
    private gB: number;
    private selectedPdt: string;
    private selectedQ: practiceQ;
    private pdtG: number;
    private nextButton: button;

    constructor(){
        super({key: 'pdtFormedScene'});
    }

    create(){
        this.nextButton=new button(this, 100, 100, "nextButton", 0.7);
        this.nextButton.on('pointerdown', ()=>this.getNext(), this);

        this.questions = new Array;
        this.questions.push(new practiceQ("SO2", 64.07, "PCl5", 208.24, "SOCl2", 118.97, "POCl3", 153.3, 1, 1, 1, 1));
        this.questions.push(new practiceQ("Fe", 55.85, "Cl2", 70.91, "FeCl3", 162.20, "", 0, 2, 3, 2, 0));
        this.questions.push(new practiceQ("NH3", 17.03, "O2", 32.00, "NO", 30.01, "H2O", 18.02, 4, 5, 4, 6));
        this.getReactantG();
        this.pickRxn();
        this.pickCD();
    }

    getReactantG(){
        this.gA=Math.round(Math.random()*1000)/100;
        console.log(this.gA);
        this.gB=Math.round(Math.random()*1000)/100;
    }

    pickRxn(){
        let index = Math.floor(Math.random()*Math.floor(this.questions.length));
        this.selectedQ=this.questions[index];
        this.nameA=this.selectedQ.getAname();
        this.nameB=this.selectedQ.getBname();
        this.nameC=this.selectedQ.getCname();
        this.nameD=this.selectedQ.getDname();

        this.coA=this.selectedQ.getAco();
        this.coB=this.selectedQ.getBco();
        this.coC=this.selectedQ.getCco();
        this.coD=this.selectedQ.getDco();

        this.mwA=this.selectedQ.getAmw();
        this.mwB=this.selectedQ.getBmw();
        this.mwC=this.selectedQ.getCmw();
        this.mwD=this.selectedQ.getDmw();
    }



    pickCD(){
        let num=Math.random();
        if (this.coD==0){
            this.selectedPdt="C";
        }
        if (num>=0.5&&this.coD!=0){
            this.selectedPdt="C";
        }
        if (num<0.5&&this.coD!=0){
            this.selectedPdt="D";
        }
    }

    update(){

    }

    findPdtG(){
        if (this.selectedPdt=="C"){
            let A = (this.gA*this.coC*this.mwC)/(this.mwA*this.coA);
            let B = (this.gB*this.coC*this.mwC)/(this.mwB*this.coB);
            if (A<=B){
                this.pdtG=A;
            }
            else {
                this.pdtG=B;
            }
        }
        if (this.selectedPdt=="D"){
            let A = (this.gA*this.coD*this.mwD)/(this.mwA*this.coA);
            let B = (this.gB*this.coD*this.mwD)/(this.mwB*this.coB); 
        }
    }

    getNext(){
        this.getReactantG();
        this.pickRxn();
        this.pickCD();
    }
}