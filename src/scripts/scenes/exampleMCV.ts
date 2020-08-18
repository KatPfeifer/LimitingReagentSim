import reactionButton from '../objects/reactionButton';
import arrowButton from '../objects/arrowButton';
import { cuvette } from '../objects/cuvette';
import dataPoint from '../objects/dataPoint';
import button from '../objects/button';
import arrowIndic from '../objects/arrowIndic';
import buttonOutline from '../objects/buttonOutline';
export default class exampleMCV extends Phaser.Scene{

  private background: Phaser.GameObjects.Image;
  private selectedRxn: string;
  private mLsLabel: Phaser.GameObjects.BitmapText;
  private mLsLabel2: Phaser.GameObjects.BitmapText;
  private mLs: number;
  private mLs2: number;
  private mLsG: Phaser.GameObjects.Image;
  private mLsH: Phaser.GameObjects.Image;
  private up1: arrowButton;
  private down1: arrowButton;
  private upCoG: arrowButton;
  private downCoG: arrowButton;
  private upCoH: arrowButton;
  private downCoH: arrowButton;
  private coG: number;
  private coH: number;
  private coGLabel: Phaser.GameObjects.BitmapText;
  private coHLabel: Phaser.GameObjects.BitmapText;
  private mixButton: button;
  private abs: number;
  private emptyCuvette: Phaser.GameObjects.Image;
  private fullCuvette: cuvette;
  private cuvetteOutline: cuvette;
  private spectro: Phaser.GameObjects.Image;
  private absLabel: Phaser.GameObjects.BitmapText;
  private background2: Phaser.GameObjects.Image;
  private graphButton: button;
  private dataList: any;
  private newestDP: Phaser.GameObjects.Image;
  private mRLabel: Phaser.GameObjects.BitmapText;
  private sPLabel: Phaser.GameObjects.BitmapText;
  private backButton: button;
  private molarity: number;
  private backOutline: buttonOutline;
  private addOutline: buttonOutline;
  private mixOutline: buttonOutline;
  private graphGH: Phaser.GameObjects.Image;
  private dot: Phaser.GameObjects.Image;

    constructor(){
        super({key: "ExampleScene"});
    }
 
    create(){
    this.molarity=0.0006;
    

    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    this.background2=this.add.image(600, 200, "bluebackground");
    this.background2.setScale(2.0);

    this.abs=0;

    this.add.text(10, 5, "Adjust reaction\ncoefficients:", {fill: "000000", fontFamily: "Calibri"});
    this.add.text(190, 5, "Adjust mLs of\nreactant solution:", {fill: "000000", fontFamily: "Calibri"});
    this.add.text(40, 55, "G", {fontSize: "25px", fill: "#9b00e3", fontFamily: "Calibri", fontStyle: "bold"});
    this.add.text(120, 55, "H", {fontSize: "25px", color: "#9b00e3", fontFamily: "Calibri", fontStyle: "bold"});
    
    this.graphGH=this.add.image(600, 115, "absGraphGH");
    this.graphGH.setScale(.65);

    this.mLs=0;
    this.mLsLabel = this.add.bitmapText(195, 55, "calibriFont");
    this.mLsLabel.fontSize=30;
    this.mLsLabel.text=this.mLs.toString()+"";

    this.mLs2=20;
    this.mLsLabel2=this.add.bitmapText(295, 55, "calibriFont");
    this.mLsLabel2.fontSize=30;
    this.mLsLabel2.text=this.mLs2.toString();

    this.mLsG=this.add.image(250, 70, "mLsG");
    this.mLsG.setScale(0.5);
    this.mLsH=this.add.image(365, 70, "mLsH");
    this.mLsH.setScale(0.5);
    
    this.coG=1;
    this.coGLabel=this.add.bitmapText(15, 55, "calibriFont");
    this.coGLabel.fontSize=30;
    this.coGLabel.text=this.coG.toString();

    this.coH=1;
    this.coHLabel=this.add.bitmapText(95, 55, "calibriFont");
    this.coHLabel.fontSize=30;
    this.coHLabel.text=this.coG.toString();

    this.absLabel=this.add.bitmapText(230, 350, "calibriFont");
    this.absLabel.fontSize=25;
    this.absLabel.text="Absorbance: " + this.abs.toString();

    this.mRLabel=this.add.bitmapText(450, 250, "calibriFont");
    this.mRLabel.fontSize=20;

    this.sPLabel=this.add.bitmapText(600, 250, "calibriFont");
    this.sPLabel.fontSize=20;

    this.createArrowButtons();

    this.mixButton=new button(this, 200, 170, "mixSolBut", 0.6);
    this.mixButton.on('pointerdown', ()=>this.findAbs(), this);
    this.mixOutline = new buttonOutline(this, 200, 170, "mixSolBut", 0.6, 0x184a01);
    this.mixButton.on('pointerover', ()=>this.mixOutline.enterHoverState(), this);
    this.mixButton.on('pointerout', ()=>this.mixOutline.exitHoverState("word"), this);

    this.graphButton= new button(this, 340, 170, "graphButton", 0.6);
    this.graphButton.on('pointerdown', ()=>this.graphPoint(), this);
    this.addOutline = new buttonOutline(this, 340, 170, "graphButton", 0.6, 0x4a0801);
    this.graphButton.on('pointerover', ()=>this.addOutline.enterHoverState(), this);
    this.graphButton.on('pointerout', ()=>this.addOutline.exitHoverState("word"), this);  

    this.createCuvettes();
    
    this.dataList=[];

    this.selectedRxn="GH"

    this.backButton=new button(this, 750, 375, "backButton", 0.7);
    this.backButton.on('pointerdown', ()=>this.goToMain(), this);this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
    this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
    this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);

    this.add.text(180, 120, "[All solutions]=0.0006M", {fill: "000000", fontFamily: "Calibri"});

    this.add.text(450, 220, "Mouse over a point for full data", {fill: "000000", fontFamily: "Calibri"});
}

    createCuvettes(){
        this.emptyCuvette=this.add.image(100, 300, "empty cuvette");
        this.emptyCuvette.setScale(0.38);
    
        this.fullCuvette=new cuvette(this, 100, 300, "fullCuvette");
        this.fullCuvette.setAlpha(0.0);
        this.fullCuvette.setScale(0.38);
    
        this.cuvetteOutline=new cuvette(this, 100, 300, "cuvetteOutline");
        this.cuvetteOutline.setAlpha(0.0);
        this.cuvetteOutline.setScale(0.38);
    
        this.spectro=this.physics.add.image(300, 280, "spectrophotometer");
        this.spectro.setScale(0.13);
        this.physics.add.overlap(this.spectro, this.fullCuvette, this.updateAbs, undefined, this);
    }

    createArrowButtons(){
        this.up1=new arrowButton(this, 200, 50, "upArrow", "up1");
        this.up1.on('pointerdown', ()=>this.changemLs("up1"));
        this.down1=new arrowButton(this, 200, 90, "downArrow", "down1");
        this.down1.on('pointerdown', ()=>this.changemLs("down1"));
        this.upCoG=new arrowButton(this, 20, 50, "upArrow", "upCoG");
        this.upCoG.on('pointerdown', ()=>this.changeCos("upCoG"), this);
        this.downCoG=new arrowButton(this,20, 90, "downArrow", "downCoG" );
        this.downCoG.on('pointerdown', ()=>this.changeCos("downCoG"), this);
        this.upCoH=new arrowButton(this, 100, 50, "upArrow", "upCoH");
        this.upCoH.on('pointerdown', ()=>this.changeCos("upCoH"), this);
        this.downCoH=new arrowButton(this, 100, 90, "downArrow", "downCoH" );
        this.downCoH.on('pointerdown', ()=>this.changeCos("downCoH"), this);
        this.upCoG.setTintFill(0x9b00e3);
        this.downCoG.setTintFill(0x9b00e3);
        this.upCoH.setTintFill(0x9b00e3);
        this.downCoH.setTintFill(0x9b00e3);
        this.up1.setTintFill(0xFFD200);
        this.down1.setTintFill(0xFFD200);
    }


    changemLs(name: string){
       if (name=="up1"&&this.mLs<20){
          this.mLs+=1;
          this.mLs2=20-this.mLs;
          this.mLsLabel.text=this.mLs.toString();
          this.mLsLabel2.text=this.mLs2.toString();
       }
       if (name=="down1"&&this.mLs>0){
          this.mLs-=1;
          this.mLs2=20-this.mLs;
          this.mLsLabel.text=this.mLs.toString();
          this.mLsLabel2.text=this.mLs2.toString();
       }
    }

    changeCos(name: string){
        this.clearGraph();
        if (name=="upCoG"&&this.coG<10){
            this.coG++;
            this.coGLabel.text=this.coG.toString();
        }
        if (name=="downCoG"&&this.coG>1){
            this.coG--;
            this.coGLabel.text=this.coG.toString();
        }
        if (name=="upCoH"&&this.coH<10){
            this.coH++;
            this.coHLabel.text=this.coH.toString();
        }
        if (name =="downCoH"&&this.coH>1){
            this.coH--;
            this.coHLabel.text=this.coH.toString();
        }
    }


    findLR(){
        if ((this.mLs/3)<this.mLs2){
          return this.mLs/3;
        }
        else {
          return this.mLs2;
        }
    }

    findAbs(){
        let G = (this.mLs*this.molarity*6120)/(this.coG*(this.mLs+this.mLs2));
        let H = (this.mLs2*this.molarity*6120)/(this.coH*(this.mLs2+this.mLs));
        if (G<=H){
            this.abs=G;
        }
        else {
            this.abs=H;
        }
        this.changeCuvette();
        this.updateAbs();
        console.log(this.abs);
    }

    updateAbs(){
        this.absLabel.text="Absorbance: "+ this.abs.toFixed(2);
    }
    
    changeCuvette(){
        this.fullCuvette.setAlpha(1.0);
        this.cuvetteOutline.setAlpha(1.0);
        this.emptyCuvette.setAlpha(0.0);
        this.fullCuvette.changeColor(this.abs);
    }

    graphPoint(){
        let MFB=this.findMF();
        let x=461+MFB*308;
        let y=175-(this.abs/2)*120;
    
        this.newestDP = new dataPoint(this, x, y, this.abs, MFB, this.selectedRxn, "Spec"); 
        this.dataList.push(this.newestDP);
    
        this.updateMRLabel();
        this.emptyCuvette.setAlpha(1.0);
        this.fullCuvette.setAlpha(0.0);
        this.fullCuvette.x=100;
        this.fullCuvette.y=300;
        this.cuvetteOutline.setAlpha(0.0);
        this.cuvetteOutline.x=100;
        this.cuvetteOutline.y=300;
    }

    //MF=mole Fraction
    //Gives mole fraction of second reactant
    findMF(){
        let molA=0.001*this.mLs;
        let molB=0.001*this.mLs2;
        return molB/(molA + molB);
    }

    updateMRLabel(){
        this.mRLabel.text="Latest Data Point: \nX(G): "+ (1-this.findMF()).toFixed(2)+"\nX(H): "+(this.findMF()).toFixed(2)+"\nA: "+(this.abs.toFixed(2));

    }

    clearGraph(){
        for (let i=this.dataList.length-1; i>-1; i--){
          this.dataList[i].setAlpha(0.0);
        }
    }

    goToMain(){
        this.scene.start('MainScene');
    }
}