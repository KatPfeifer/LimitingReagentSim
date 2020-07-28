import button from "../objects/button";
import practiceQ from "../objects/practiceQ";
import rxnImage from "../objects/rxnImage";

export default class reactantLeft extends Phaser.Scene{
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
    private selectedQ: practiceQ;
    private excess: number;
    private wrongLR: number;
    private noMolespic: Phaser.GameObjects.Image;


    constructor(){
        super({key: 'reactantLeftScene'});
    }

    create(){

        this.nextButton=new button(this, 100, 375, "nextButton", 0.7);
        this.nextButton.on('pointerdown', ()=>this.getNext(), this);

        this.qLabel = this.add.bitmapText(20, 20, "pixelFont");
        this.qLabel.setFontSize(30);
        this.qLabel.setTintFill(0x000000);

        this.qLabel2=this.add.bitmapText(20, 100, "pixelFont");
        this.qLabel2.setFontSize(30);
        this.qLabel2.setTintFill(0x000000);
        this.qLabel2.setText("How many grams of excess reactant remain at the end of the reaction?")

        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goBack(), this);

        this.MWbox=this.add.image(90, 250, "MWbox");
        this.MWbox.setScale(0.3);

        this.correctpic=this.add.image(550, 250, "correct");
        this.correctpic.setScale(0.4);
        this.correctpic.setAlpha(0.0);

        this.noMolespic=this.add.image(550, 250, "noMoles");
        this.noMolespic.setScale(0.4);
        this.noMolespic.setAlpha(0.0);

        this.mwALabel = this.add.bitmapText(25, 200, "pixelFont");
        this.mwALabel.setFontSize(25);
        this.mwALabel.setTintFill(0x000000);
        this.mwBLabel = this.add.bitmapText(25, 230, "pixelFont");
        this.mwBLabel.setFontSize(25);
        this.mwBLabel.setTintFill(0x000000);
        this.mwCLabel = this.add.bitmapText(25, 260, "pixelFont");
        this.mwCLabel.setFontSize(25);
        this.mwCLabel.setTintFill(0x000000);
        this.mwDLabel = this.add.bitmapText(25, 290, "pixelFont");
        this.mwDLabel.setFontSize(25);
        this.mwDLabel.setTintFill(0x000000);

        this.questions = new Array;
        this.questions.push(new practiceQ("SO2", 64.07, "PCl5", 208.24, "SOCl2", 118.97, "POCl3", 153.3, 1, 1, 1, 1));
        this.questions.push(new practiceQ("Fe", 55.85, "Cl2", 70.91, "FeCl3", 162.20, "", 0, 2, 3, 2, 0));
        this.questions.push(new practiceQ("NH3", 17.03, "O2", 32.00, "NO", 30.01, "H2O", 18.02, 4, 5, 4, 6));
        this.questions.push(new practiceQ("C2H4", 26.04, "O2", 32.00, "CO2", 44.01, "H2O", 18.02, 1, 1, 2, 2));
        this.questions.push(new practiceQ("Si", 28.09, "N2", 28.01, "Si3N4", 140.28, "", 0, 3, 2, 1, 0));
    
        this.rxnImages=new Array;
        this.rxnImages.push(new rxnImage(this, 175, 75, "SO2Rxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "FeCl2Rxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "NH3Rxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "C2H4Rxn", 0.7));
        this.rxnImages.push(new rxnImage(this, 175, 75, "SiRxn", 0.7));
    
        this.answerBox=this.add.dom(550, 150).createFromCache('inputForm');
        this.answerBox.addListener('click');
        this.answerBox.on('click', ()=>this.handleClick(event));

        this.getReactantG();
        this.pickRxn();
        this.findExcess();
        this.updateQLabel();
        this.showPics();

    }

    handleClick(e){
        if (e.target.name=='submitButton'){
            this.answerInput=this.answerBox.getChildByName("answerField");
            this.answer= this.answerInput.value;
            console.log(this.answer);
            this.compare();
        }
    }

    getReactantG(){
        this.gA=Math.round(Math.random()*1000)/10;
        console.log(this.gA);
        this.gB=Math.round(Math.random()*1000)/10;
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

    updateQLabel(){
        this.qLabel.text=this.gA + "g " + this.nameA + " reacts with "+ this.gB+"g "+this.nameB+" according to the following reaction:" 
    }

    update(){

    }

    findExcess(){
        //A= number g B required to react with all of A
        let A = (this.gA*this.coB*this.mwB)/(this.mwA*this.coA);
        let B = (this.gB*this.coA*this.mwA)/(this.mwB*this.coB)
        if (A>this.gB){
            //B limits
            this.excess=this.gA-B;
            this.wrongLR=this.gB-A;
        }
        if (A<=this.gB){
            //A limits
            this.excess=this.gB-A;
            this.wrongLR=this.gA-B;
        }
        console.log(this.excess);
    }

    compare(){
        this.resetPics();
        this.answer=parseFloat(<string> this.answer);
        console.log(this.answer);

        if(this.between(this.answer, this.answer+this.answer*.1, this.answer-this.answer*.1)){
            this.correctpic.setAlpha(1.0);
        }

        let A = this.gA - (this.gB*this.coA)/this.coB;
        let B = this.gB - (this.gA*this.coB)/this.coA;

        if (this.between(this.answer, A+A*.1, A-A*.1)||this.between(this.answer, B+B*.1, B-B*.1)){
            this.noMolespic.setAlpha(1.0);
        }

    }

    getNext(){
        this.getReactantG();
        this.pickRxn();
        this.findExcess();
        this.updateQLabel();
        this.showPics();
    }

    resetPics(){
        this.correctpic.setAlpha(0.0);
        this.noMolespic.setAlpha(0.0);
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
}