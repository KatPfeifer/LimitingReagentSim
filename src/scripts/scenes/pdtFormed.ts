import practiceQ from "../objects/practiceQ";
import button from '../objects/button';
import rxnImage from "../objects/rxnImage";

export default class pdtFormed extends Phaser.Scene{
    private questions: any;//figure out how to type this
    private rxnImages: any;
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
    private qLabel: Phaser.GameObjects.BitmapText;
    private index: number;
    private mwALabel: Phaser.GameObjects.BitmapText;
    private mwBLabel: Phaser.GameObjects.BitmapText;
    private mwCLabel: Phaser.GameObjects.BitmapText;
    private mwDLabel: Phaser.GameObjects.BitmapText;
    private MWbox: Phaser.GameObjects.Image;

    constructor(){
        super({key: 'pdtFormedScene'});
    }

    create(){
        this.nextButton=new button(this, 100, 375, "nextButton", 0.7);
        this.nextButton.on('pointerdown', ()=>this.getNext(), this);

        this.qLabel = this.add.bitmapText(20, 20, "pixelFont");
        this.qLabel.setFontSize(25);
        this.qLabel.setTintFill(0x000000);

        this.MWbox=this.add.image(90, 200, "MWbox");
        this.MWbox.setScale(0.3);

        this.mwALabel = this.add.bitmapText(25, 150, "pixelFont");
        this.mwALabel.setFontSize(25);
        this.mwALabel.setTintFill(0x000000);
        this.mwBLabel = this.add.bitmapText(25, 180, "pixelFont");
        this.mwBLabel.setFontSize(25);
        this.mwBLabel.setTintFill(0x000000);
        this.mwCLabel = this.add.bitmapText(25, 210, "pixelFont");
        this.mwCLabel.setFontSize(25);
        this.mwCLabel.setTintFill(0x000000);
        this.mwDLabel = this.add.bitmapText(25, 240, "pixelFont");
        this.mwDLabel.setFontSize(25);
        this.mwDLabel.setTintFill(0x000000);

        this.questions = new Array;
        this.questions.push(new practiceQ("SO2", 64.07, "PCl5", 208.24, "SOCl2", 118.97, "POCl3", 153.3, 1, 1, 1, 1));
        this.questions.push(new practiceQ("Fe", 55.85, "Cl2", 70.91, "FeCl3", 162.20, "", 0, 2, 3, 2, 0));
        this.questions.push(new practiceQ("NH3", 17.03, "O2", 32.00, "NO", 30.01, "H2O", 18.02, 4, 5, 4, 6));
        
        this.rxnImages=new Array;
        this.rxnImages.push(new rxnImage(this, 150, 100, "SO2Rxn", 0.5));
        this.rxnImages.push(new rxnImage(this, 150, 100, "FeCl2Rxn", 0.5));
        this.rxnImages.push(new rxnImage(this, 150, 100, "NH3Rxn", 0.5));
        
        this.getReactantG();
        this.pickRxn();
        this.pickCD();
        this.findPdtG();
        this.updateQLabel();
        this.showPics();
    }

    getReactantG(){
        this.gA=Math.round(Math.random()*1000)/100;
        console.log(this.gA);
        this.gB=Math.round(Math.random()*1000)/100;
    }

    pickRxn(){
        this.index = Math.floor(Math.random()*Math.floor(this.questions.length));
        this.selectedQ=this.questions[this.index];
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

        this.mwALabel.text=this.nameA + ": "+ this.mwA.toString();
        this.mwBLabel.text=this.nameB + ": "+ this.mwB.toString();
        this.mwCLabel.text=this.nameC + ": "+ this.mwC.toString();
        
        if (this.coD!=0){
            this.mwDLabel.text=this.nameD + ": "+ this.mwD.toString();
        }
        if (this.coD==0){
            this.mwDLabel.text="";
        }
    }

    showPics(){
        for (let i=0; i<this.rxnImages.length; i++){
            if (this.index==i){
                this.rxnImages[i].setAlpha(1.0);
            }
            else {
                this.rxnImages[i].setAlpha(0.0);
            }
        }
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

    updateQLabel(){
        if (this.selectedPdt=="C"){
            this.qLabel.text="How many grams of " + this.nameC + " are formed when " + this.gA.toString() + "g "+
            this.nameA + " react with " + this.gB.toString() + "g " + this.nameB + "?"; 
        }
        if (this.selectedPdt=="D"){
            this.qLabel.text="How many grams of " + this.nameD + " are formed when " + this.gA.toString() + "g "+
            this.nameA + " react with " + this.gB.toString() + "g " + this.nameB + "?"; 
        }
    }

    update(){

    }

    findPdtG(){
        if (this.selectedPdt=="C"){
            let A = (this.gA*this.coC*this.mwC)/(this.mwA*this.coA);
            let B = (this.gB*this.coC*this.mwC)/(this.mwB*this.coB);
            if (A<=B){
                this.pdtG=Math.round(A*100)/100;
            }
            else {
                this.pdtG=Math.round(B*100)/100;
            }
        }
        if (this.selectedPdt=="D"){
            let A = (this.gA*this.coD*this.mwD)/(this.mwA*this.coA);
            let B = (this.gB*this.coD*this.mwD)/(this.mwB*this.coB);
            if (A<=B){
                this.pdtG=Math.round(A*100)/100;
            }
            else {
                this.pdtG=Math.round(B*100)/100;
            } 
        }
        console.log(this.pdtG);
    }

    getNext(){
        this.getReactantG();
        this.pickRxn();
        this.pickCD();
        this.findPdtG();
        this.updateQLabel();
        this.showPics();
    }
}