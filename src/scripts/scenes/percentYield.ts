import practiceQ from "../objects/practiceQ";
import button from '../objects/button';
import rxnImage from "../objects/rxnImage";
import buttonOutline from "../objects/buttonOutline";

export default class percentYield extends Phaser.Scene{
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
    private qLabel2: Phaser.GameObjects.BitmapText;
    private index: number;
    private mwALabel: Phaser.GameObjects.BitmapText;
    private mwBLabel: Phaser.GameObjects.BitmapText;
    private mwCLabel: Phaser.GameObjects.BitmapText;
    private mwDLabel: Phaser.GameObjects.BitmapText;
    private MWbox: Phaser.GameObjects.Image;
    private answerBox: Phaser.GameObjects.DOMElement;
    private answerInput: any;
    private answer: any;
    private correctpic: Phaser.GameObjects.Image;
    private backButton: button;
    private py: number;
    private IDLRButton: button;
    private PFButton: button;
    private RLButton: button;
    private IDLRBO: buttonOutline; //=ID Limiting Reactant Button Outline
    private PFBO: buttonOutline;
    private RLBO: buttonOutline;
    private backOutline: buttonOutline;
    private nextOutline: buttonOutline;
    private wrongLR: number;
    private wrongLRpic: Phaser.GameObjects.Image;
    private helpPic: Phaser.GameObjects.Image;
    private notPY: number;
    private decimalPic: Phaser.GameObjects.Image;



    constructor(){
        super({key: 'percentYieldScene'});
    }

    create(){
        this.nextButton=new button(this, 100, 375, "nextButton", 0.7);
        this.nextButton.on('pointerdown', ()=>this.getNext(), this);
        this.nextOutline = new buttonOutline(this, 100, 375, "nextButton", 0.7, 0x20014a);
        this.nextButton.on('pointerover', ()=>this.nextOutline.enterHoverState(), this);
        this.nextButton.on('pointerout', ()=>this.nextOutline.exitHoverState("word"), this);

        this.add.text(410, 170, "Round to the nearest percent", {fontFamily: "Calibri", fill: "000000"});

        this.qLabel = this.add.bitmapText(20, 20, "calibri");
        this.qLabel.setFontSize(25);

        this.qLabel2=this.add.bitmapText(20, 100, "calibri");
        this.qLabel2.setFontSize(25);
        this.qLabel2.setText("What is the percent yield of the reaction?")

        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goBack(), this);
        this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
        this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
        this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);

        this.MWbox=this.add.image(90, 250, "MWbox");
        this.MWbox.setScale(0.3);

        this.correctpic=this.add.image(550, 260, "correct");
        this.correctpic.setScale(0.5);
        this.correctpic.setAlpha(0.0);

        this.wrongLRpic = this.add.image(550, 250, "wrongLR");
        this.wrongLRpic.setScale(0.45);
        this.wrongLRpic.setAlpha(0.0);

        this.helpPic = this.add.image(550, 250, "pyHelp");
        this.helpPic.setScale(0.45);
        this.helpPic.setAlpha(0.0);

        this.decimalPic=this.add.image(550, 250, "decimal");
        this.decimalPic.setScale(0.45);
        this.decimalPic.setAlpha(0.0);

        this.mwALabel = this.add.bitmapText(25, 200, "calibri");
        this.mwALabel.setFontSize(25);
        this.mwBLabel = this.add.bitmapText(25, 230, "calibri");
        this.mwBLabel.setFontSize(25);
        this.mwCLabel = this.add.bitmapText(25, 260, "calibri");
        this.mwCLabel.setFontSize(25);
        this.mwDLabel = this.add.bitmapText(25, 290, "calibri");
        this.mwDLabel.setFontSize(25);

        this.IDLRButton = new button(this, 330, 375, "IDLR", 0.7);
        this.IDLRButton.on('pointerdown', ()=>this.goToIDLR(), this);
        this.IDLRBO = new buttonOutline(this, 330, 375, "IDLR", 0.7, 0x6e1a01);
        this.IDLRButton.on('pointerover', ()=>this.IDLRBO.enterHoverState(), this);
        this.IDLRButton.on('pointerout', ()=>this.IDLRBO.exitHoverState("word"), this);

        this.PFButton = new button(this, 470, 375, "PdtFormed", 0.7);
        this.PFButton.on('pointerdown', ()=>this.goToPF(), this);
        this.PFBO = new buttonOutline(this, 470, 375, "PdtFormed", 0.7, 0x6e1a01);
        this.PFButton.on('pointerover', ()=>this.PFBO.enterHoverState(), this);
        this.PFButton.on('pointerout', ()=>this.PFBO.exitHoverState("word"), this);

        this.RLButton = new button(this, 600, 375, "ReactantLeft", 0.7);
        this.RLButton.on('pointerdown', ()=>this.goToRL(), this);
        this.RLBO = new buttonOutline(this, 600, 375, "ReactantLeft", 0.7, 0x6e1a01);
        this.RLButton.on('pointerover', ()=>this.RLBO.enterHoverState(), this);
        this.RLButton.on('pointerout', ()=>this.RLBO.exitHoverState("word"), this);

        this.questions = new Array;
        this.questions.push(new practiceQ("SO2", 64.07, "PCl5", 208.24, "SOCl2", 118.97, "POCl3", 153.3, 1, 1, 1, 1));
        this.questions.push(new practiceQ("Fe", 55.85, "Cl2", 70.91, "FeCl3", 162.20, "", 0, 2, 3, 2, 0));
        this.questions.push(new practiceQ("NH3", 17.03, "O2", 32.00, "NO", 30.01, "H2O", 18.02, 4, 5, 4, 6));
        this.questions.push(new practiceQ("C2H4", 26.04, "O2", 32.00, "CO2", 44.01, "H2O", 18.02, 1, 3, 2, 2));
        this.questions.push(new practiceQ("Si", 28.09, "N2", 28.01, "Si3N4", 140.28, "", 0, 3, 2, 1, 0));
        this.questions.push(new practiceQ("Na", 23.00, "H2O", 18.02, "NaOH", 40.00, "H2", 2.02, 2, 2, 2, 1));
        this.questions.push(new practiceQ("NaCl", 58.44, "Pb(NO3)2", 331.21, "NaNO3", 84.99, "PbCl2", 278.1, 2, 1, 2, 1));
        this.questions.push(new practiceQ("CO", 28.01, "H2", 2.02, "CH3OH", 32.04, "", 0, 1, 2, 1, 0));

        this.rxnImages=new Array;
        this.rxnImages.push(new rxnImage(this, 175, 75, "SO2Rxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "FeCl2Rxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "NH3Rxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "C2H4Rxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "SiRxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "NaRxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 200, 75, "NaClRxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "CORxn", 0.7));
    

        
        this.answerBox=this.add.dom(550, 150).createFromCache('inputForm');
        this.answerBox.addListener('click');
        this.answerBox.on('click', ()=>this.handleClick(event));

        this.getReactantG();
        this.getPY();
        this.pickRxn();
        this.pickCD();
        this.findPdtG();
        this.updateQLabel();
        this.showPics();
    }

    handleClick(e){
        if (e.target.name=='submitButton'){
            this.answerInput=this.answerBox.getChildByName("answerField");
            this.answer= this.answerInput.value;
            this.compare();
        }
    }

    getReactantG(){
        this.gA=Math.round(Math.random()*1000)/100;
        this.gB=Math.round(Math.random()*1000)/100;
    }

    getPY(){
        this.py=Math.round(Math.random()*100)/100
        console.log("Percent Yield: "+ this.py*100);
    }

    findPdtG(){
        if (this.selectedPdt=='C'){
            //A = # g C that can be made with given A = theoretical yield of A
            let A = (this.gA*this.coC*this.mwC)/(this.mwA*this.coA);
            let B=(this.gB*this.coC*this.mwC)/(this.mwB*this.coB);
            if (A<=B){
                //A Limits
                this.pdtG=A*this.py;
                this.notPY=this.pdtG/B;
            }
            if (A>B){
                this.pdtG=B*this.py;
                this.notPY=this.pdtG/A;
            }
        }
        if (this.selectedPdt=='D'){
            //A = # g D that can be made with given A
            let A = (this.gA*this.coD*this.mwD)/(this.mwA*this.coA);
            let B=(this.gB*this.coD*this.mwD)/(this.mwB*this.coB);
            if (A<=B){
                this.pdtG=A*this.py;
                this.notPY=this.pdtG/B;
            }
            if (A>B){
                this.pdtG=B*this.py;
                this.notPY=this.pdtG/A;
            }
        }
        console.log("Yield for wrong LR: " + this.notPY*100);
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
           this.qLabel.text="In the lab, " + this.gA + "g " + this.nameA + " reacted with " + this.gB + "g " + this.nameB + " to form " + this.pdtG.toFixed(2) + "g " + this.nameC;
        }
        if (this.selectedPdt=="D"){
            this.qLabel.text="In the lab, " + this.gA + "g " + this.nameA + " reacted with " + this.gB + "g " + this.nameB + " to form " + this.pdtG.toFixed(2) + "g " + this.nameD;
        }
    }

    compare(){
        this.resetPics();
        this.answer=parseFloat(<string> this.answer);

        if (this.between(this.answer, this.py*100+1, this.py*100-1)){
            this.correctpic.setAlpha(1.0);
            return;
        }
        if (this.between(this.answer, this.notPY*100+1, this.notPY*100-1)){
            this.wrongLRpic.setAlpha(1.0);
            return;
        }
        if (this.answer<1.0){
            this.decimalPic.setAlpha(1.0);
            return;
        }
        else {
            this.helpPic.setAlpha(1.0);
        }

    }


    update(){
    }

    getNext(){
        this.getReactantG();
        this.getPY();
        this.pickRxn();
        this.pickCD();
        this.findPdtG();
        this.updateQLabel();
        this.showPics();
        this.resetPics();
    }

    resetPics(){
        this.correctpic.setAlpha(0.0);
        this.wrongLRpic.setAlpha(0.0);
        this.decimalPic.setAlpha(0.0);
        this.helpPic.setAlpha(0.0);
    }

    between(num: number, up: number, down: number){
        if (num<=up&&num>=down){
            return true;
        }
        else {
            return false;
        }
    }

    goBack(){
        this.scene.start("MainScene");
    }

    goToIDLR(){
        this.scene.start("pickLRScene");
    }

    goToPF(){
        this.scene.start("pdtFormedScene");
    }

    goToRL(){
        this.scene.start("reactantLeftScene");
    }
}