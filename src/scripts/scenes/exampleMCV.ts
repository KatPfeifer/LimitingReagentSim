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
  private Acoefficient: number;
  private Bcoefficient: number;
  private molarity: number;
  private backOutline: buttonOutline;
  private addOutline: buttonOutline;
  private mixOutline: buttonOutline;

    constructor(){
        super({key: "ExampleScene"});
    }
 
    create(){
    this.molarity=0.001;
    this.Acoefficient=3;
    this.Bcoefficient=2;

    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    this.background2=this.add.image(600, 200, "bluebackground");
    this.background2.setScale(2.0);

    this.abs=0;

    this.mLs=0;
    this.mLsLabel = this.add.bitmapText(195, 60, "pixelFont");
    this.mLsLabel.fontSize=30;
    this.mLsLabel.text=this.mLs.toString()+"";
    this.mLsLabel.setTintFill(0x000000);

    this.mLs2=20;
    this.mLsLabel2=this.add.bitmapText(305, 60, "pixelFont");
    this.mLsLabel2.fontSize=30;
    this.mLsLabel2.text=this.mLs2.toString();
    this.mLsLabel2.setTintFill(0x000000);

    this.coG=1;
    this.coGLabel=this.add.bitmapText(15, 60, "pixelFont");
    this.coGLabel.fontSize=30;
    this.coGLabel.text=this.coG.toString();
    this.coGLabel.setTintFill(0x000000);

    this.coH=1;
    this.coHLabel=this.add.bitmapText(95, 60, "pixelFont");
    this.coHLabel.fontSize=30;
    this.coHLabel.text=this.coG.toString();
    this.coHLabel.setTintFill(0x000000);

    this.absLabel=this.add.bitmapText(230, 350, "pixelFont");
    this.absLabel.fontSize=30;
    this.absLabel.text="Absorbance: " + this.abs.toString();
    this.absLabel.setTintFill(0x000000);

    this.mRLabel=this.add.bitmapText(450, 250, "pixelFont");
    this.mRLabel.fontSize=20;
    this.mRLabel.setTintFill(0x000000);

    this.sPLabel=this.add.bitmapText(600, 250, "pixelFont");
    this.sPLabel.fontSize=20;
    this.sPLabel.setTintFill(0x000000);

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

    this.backButton=new button(this, 750, 375, "backButton", 0.7);
    this.backButton.on('pointerdown', ()=>this.goToMain(), this);this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
    this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
    this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);

    this.add.text(180, 120, "[All solutions]=0.001M", {fill: "000000", fontFamily: "Calibri"});


    this.add.text(450, 220, "Mouse over a point for full data", {fill: "000000", fontFamily: "Calibri"});
    }

    createCuvettes(){
        this.emptyCuvette=this.add.image(100, 300, "empty cuvette");
        this.emptyCuvette.setScale(0.15);
    
        this.fullCuvette=new cuvette(this, 100, 300, "fullCuvette");
        this.fullCuvette.setAlpha(0.0);
    
        this.cuvetteOutline=new cuvette(this, 100, 300, "cuvetteOutline");
        this.cuvetteOutline.setAlpha(0.0);
    
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
        this.upCoG.setTintFill(0xe30031);
        this.downCoG.setTintFill(0xe30031);
        this.upCoH.setTintFill(0xe30031);
        this.downCoH.setTintFill(0xe30031);
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
        
        /*if (this.selectedRxn=="AB"){
          let A=(this.mLs*this.molarity*6120)/(this.Acoefficient*(this.mLs+this.mLs2));
          let B=(this.mLs2*this.molarity*6120)/(this.Bcoefficient*(this.mLs+this.mLs2));
          if (A<=B){
            this.abs=A;
          }
          else {
            this.abs=B;
          }
        }
        if (this.selectedRxn=="CD"||this.selectedRxn=="EF"){
          this.abs=0;
        }
        */
        this.changeCuvette();
        this.updateAbs();
    }

    updateAbs(){
        this.absLabel.text="Absorbance: "+ this.abs.toString().substring(0,4);
    }
    
    changeCuvette(){
        this.fullCuvette.setAlpha(1.0);
        this.cuvetteOutline.setAlpha(1.0);
        this.emptyCuvette.setAlpha(0.0);
        this.fullCuvette.changeColor(this.abs);
    }

    graphPoint(){
        let MFB=this.findMF();
        let x=464+MFB*304;
        let y=180-(this.abs/2.5)*124;
    
        this.newestDP = new dataPoint(this, x, y, this.abs, MFB, this.selectedRxn); 
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
        if (this.selectedRxn=="AB"){
          this.mRLabel.text="Latest Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs.toString().substring(0,4));
        }
        if (this.selectedRxn=="CD"){
          this.mRLabel.text="Latest Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs);
        }
        if (this.selectedRxn=="EF"){
          this.mRLabel.text="Latest Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs);
        }
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