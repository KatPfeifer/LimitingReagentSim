import button from "../objects/button";
import practiceQ from "../objects/practiceQ";
import rxnImage from "../objects/rxnImage";
import buttonOutline from "../objects/buttonOutline";

export default class pickLR extends Phaser.Scene{
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
    private LR: string;
    private wrongLR: string;
    private wrongLRpic: Phaser.GameObjects.Image;
    private helpPic: Phaser.GameObjects.Image;
    private PYButton: button;
    private RLButton: button;
    private PFButton: button;
    private PFBO: buttonOutline;
    private RLBO: buttonOutline;
    private PYBO: buttonOutline;
    private backOutline: buttonOutline;
    private nextOutline: buttonOutline;

    constructor(){
        super({key: 'pickLRScene'});
    }

    create(){
        this.nextButton=new button(this, 100, 375, "nextButton", 0.7);
        this.nextButton.on('pointerdown', ()=>this.getNext(), this);
        this.nextOutline = new buttonOutline(this, 100, 375, "nextButton", 0.7, 0x20014a);
        this.nextButton.on('pointerover', ()=>this.nextOutline.enterHoverState(), this);
        this.nextButton.on('pointerout', ()=>this.nextOutline.exitHoverState("word"), this);

        this.qLabel = this.add.bitmapText(20, 20, "pixelFont");
        this.qLabel.setFontSize(30);
        this.qLabel.setTintFill(0x000000);

        this.add.text(410, 170, "Ex. NH3 or O2", {fill: "000000"});

        this.qLabel2=this.add.bitmapText(20, 100, "pixelFont");
        this.qLabel2.setFontSize(30);
        this.qLabel2.setTintFill(0x000000);
        this.qLabel2.setText("Which reactant is the limiting reactant?")

        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goBack(), this);
        this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
        this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
        this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);

        this.MWbox=this.add.image(90, 250, "MWbox");
        this.MWbox.setScale(0.3);

        this.PFButton = new button(this, 335, 375, "PdtFormed", 0.7);
        this.PFButton.on('pointerdown', ()=>this.goToPF(), this);
        this.PFBO = new buttonOutline(this, 335, 375, "PdtFormed", 0.7, 0x6e1a01);
        this.PFButton.on('pointerover', ()=>this.PFBO.enterHoverState(), this);
        this.PFButton.on('pointerout', ()=>this.PFBO.exitHoverState("word"), this);

        this.RLButton = new button(this, 470, 375, "ReactantLeft", 0.7);
        this.RLButton.on('pointerdown', ()=>this.goToRL(), this);
        this.RLBO = new buttonOutline(this, 470, 375, "ReactantLeft", 0.7, 0x6e1a01);
        this.RLButton.on('pointerover', ()=>this.RLBO.enterHoverState(), this);
        this.RLButton.on('pointerout', ()=>this.RLBO.exitHoverState("word"), this);

        this.PYButton = new button(this, 610, 375, "PY", 0.7);
        this.PYButton.on('pointerdown', ()=>this.goToPY(), this);
        this.PYBO= new buttonOutline(this, 610, 375, "PY", 0.7, 0x6e1a01);
        this.PYButton.on('pointerover', ()=>this.PYBO.enterHoverState(), this);
        this.PYButton.on('pointerout', ()=>this.PYBO.exitHoverState("word"), this);

        this.correctpic=this.add.image(550, 275, "correct");
        this.correctpic.setScale(0.45);
        this.correctpic.setAlpha(0.0);

        this.wrongLRpic=this.add.image(550, 250, "LRhelp");
        this.wrongLRpic.setScale(0.4);
        this.wrongLRpic.setAlpha(0.0);

        this.helpPic=this.add.image(550, 250, "LRhelp2");
        this.helpPic.setScale(0.4);
        this.helpPic.setAlpha(0.0);

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
        this.findLR();
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

    findLR(){
        //A= number g B required to react with all of A
        let A = (this.gA*this.coB*this.mwB)/(this.mwA*this.coA);
        let B = (this.gB*this.coA*this.mwA)/(this.mwB*this.coB) 

        if (A>this.gB){
            //B limits
            this.LR=this.nameB;
            this.wrongLR=this.nameA;
        }
        if (A<=this.gB){
            //A limits
            this.LR=this.nameA;
            this.wrongLR=this.nameB;
        }
        console.log(this.LR);
    }

    updateQLabel(){
        this.qLabel.text=this.gA + "g " + this.nameA + " reacts with "+ this.gB+"g "+this.nameB+" according to the following reaction:" 
    }

    compare(){
        this.resetPics();
        if (this.answer.toLowerCase()==this.LR.toLowerCase()){
            this.correctpic.setAlpha(1.0);
        }
        if (this.answer.toLowerCase()==this.wrongLR.toLowerCase()){
            this.wrongLRpic.setAlpha(1.0);
        }
        if (this.answer.toLowerCase()!=this.LR.toLowerCase()&&this.answer.toLowerCase()!=this.wrongLR.toLowerCase()) {
            this.helpPic.setAlpha(1.0);
        }

    }

    update(){
        
    }

    getNext(){
        this.getReactantG();
        this.pickRxn();
        this.findLR();
        this.updateQLabel();
        this.showPics();
        this.resetPics();
    }

    resetPics(){
        this.correctpic.setAlpha(0.0);
        this.wrongLRpic.setAlpha(0.0);
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

    goToPF(){
        this.scene.start("pdtFormedScene");
    }
    
    goToRL(){
       this.scene.start("reactantLeftScene");
    }
    
    goToPY(){
       this.scene.start("percentYieldScene");
    }
    
}