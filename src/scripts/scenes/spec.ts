import reactionButton from '../objects/reactionButton';
import arrowButton from '../objects/arrowButton';
import { cuvette } from '../objects/cuvette';
import dataPoint from '../objects/dataPoint';
import button from '../objects/button';
import arrowIndic from '../objects/arrowIndic';
import buttonOutline from '../objects/buttonOutline';

export default class SpecScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private selectedRxn: string;
  private mLsLabel: Phaser.GameObjects.BitmapText;
  private mLsLabel2: Phaser.GameObjects.BitmapText;
  private mLs: number;
  private mLs2: number;
  private up1: arrowButton;
  private down1: arrowButton;
  private mixButton: button;
  private abs: number;
  private emptyCuvette: Phaser.GameObjects.Image;
  private fullCuvette: cuvette;
  private cuvetteOutline: cuvette;
  private spectro: Phaser.GameObjects.Image;
  private absLabel: Phaser.GameObjects.BitmapText;
  private background2: Phaser.GameObjects.Image;
  private absGraphAB: Phaser.GameObjects.Image;
  private absGraphCD: Phaser.GameObjects.Image;
  private absGraphEF: Phaser.GameObjects.Image;
  private graphButton: button;
  private dataList: any;
  private newestDP: Phaser.GameObjects.Image;
  private mRLabel: Phaser.GameObjects.BitmapText;
  private sPLabel: Phaser.GameObjects.BitmapText;
  private backButton: button;
  private mLA: Phaser.GameObjects.Image;
  private mLB: Phaser.GameObjects.Image;
  private mLC: Phaser.GameObjects.Image;
  private mLD: Phaser.GameObjects.Image;
  private mLE: Phaser.GameObjects.Image;
  private mLF: Phaser.GameObjects.Image;
  private mainButton: button;
  private Acoefficient: number;
  private Bcoefficient: number;
  private molarity: number;
  private version: number;
  private button1: button;
  private button2: button;
  private button3: button;
  private selectedVersion: string;
  private outline1: buttonOutline;
  private outline2: buttonOutline;
  private outline3: buttonOutline;
  private backOutline: buttonOutline;
  private mainOutline: buttonOutline;
  private addOutline: buttonOutline;
  private mixOutline: buttonOutline;
  private helpButton: button;
  private helpOutline: buttonOutline;
  private oldDataPoints: any;

  constructor() {
    super({ key: 'SpecScene' });
  }

  create() {
    console.log("in create");
    this.molarity=0.001;
    this.Acoefficient=3;
    this.Bcoefficient=2;
    this.version=1;
    this.selectedVersion="button1";

    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    this.background2=this.add.image(600, 200, "bluebackground");
    this.background2.setScale(2.0);

    this.abs=0;

    this.mLs=0;
    this.mLsLabel = this.add.bitmapText(195, 55, "calibri");
    this.mLsLabel.fontSize=30;
    this.mLsLabel.text=this.mLs.toString()+"";

    this.mLs2=20;
    this.mLsLabel2=this.add.bitmapText(295, 55, "calibri");
    this.mLsLabel2.fontSize=30;
    this.mLsLabel2.text=this.mLs2.toString();

    this.absLabel=this.add.bitmapText(230, 350, "calibri");
    this.absLabel.fontSize=25;
    this.absLabel.text="Absorbance: " + this.abs.toString();

    this.mRLabel=this.add.bitmapText(450, 250, "calibri");
    this.mRLabel.fontSize=20;

    this.sPLabel=this.add.bitmapText(600, 250, "calibri");
    this.sPLabel.fontSize=20;

    this.absGraphAB=this.add.image(600, 120, "absGraphAB");
    this.absGraphAB.setScale(0.65);
    this.absGraphCD=this.add.image(600, 120, "absGraphCD");
    this.absGraphCD.setScale(0.65);
    this.absGraphEF=this.add.image(600, 120, "absGraphEF");
    this.absGraphEF.setScale(0.65);
    this.changeGraphs();

    this.createArrowButtons();

    this.helpButton=new button(this, 40, 375, "helpButton", 0.7);
    this.helpButton.on('pointerdown', ()=>this.goToHelp(), this);
    this.helpOutline = new buttonOutline(this, 40, 375, "helpButton", 0.7, 0x4a0101);
    this.helpButton.on('pointerover', ()=>this.helpOutline.enterHoverState(), this);
    this.helpButton.on('pointerout', ()=>this.helpOutline.exitHoverState("word"), this);

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
    this.createmLs();
    
    this.dataList=[];

    this.backButton=new button(this, 750, 375, "backButton", 0.7);
    this.backButton.on('pointerdown', ()=>this.goBack(), this);
    this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
    this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
    this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);

    this.mainButton=new button(this, 650, 375, "mainButton", 0.7);
    this.mainButton.on('pointerdown', ()=>this.goToMain(), this);
    this.mainOutline = new buttonOutline(this, 650, 375, "mainButton", 0.7, 0x4a01320);
    this.mainButton.on('pointerover', ()=>this.mainOutline.enterHoverState(), this);
    this.mainButton.on('pointerout', ()=>this.mainOutline.exitHoverState("word"));

    this.button1=new button(this, 50, 50, "button1", 0.7);
    this.button1.on('pointerdown', ()=>this.changeCoefficients(1), this);
    this.button2=new button(this, 50, 100, "button2", 0.7);
    this.button2.on('pointerdown', ()=>this.changeCoefficients(2), this);
    this.button3=new button(this, 50, 150, "button3", 0.7);
    this.button3.on('pointerdown', ()=>this.changeCoefficients(3), this);

    this.outline1=new buttonOutline(this, 50, 50, "button1", 0.7, 0x000061);
    this.outline1.setAlpha(0.3);
    this.button1.on('pointerover', ()=>this.outline1.enterHoverState(), this);
    this.button1.on('pointerout', ()=>this.outline1.exitHoverState(this.selectedVersion), this);
    this.outline2=new buttonOutline(this, 50, 100, "button2", 0.7, 0x000061);
    this.button2.on('pointerover', ()=>this.outline2.enterHoverState(), this);
    this.button2.on('pointerout', ()=>this.outline2.exitHoverState(this.selectedVersion), this);
    this.outline3=new buttonOutline(this, 50, 150, "button3", 0.7, 0x000061);
    this.button3.on('pointerover', ()=>this.outline3.enterHoverState(), this);
    this.button3.on('pointerout', ()=>this.outline3.exitHoverState(this.selectedVersion), this);

    this.add.text(180, 120, "[All solutions]=0.001M", {fontFamily: "calibri", fill: "000000"});
    this.add.text(190, 5, "Adjust mLs of\nreactant solution:", {fill: "000000", fontFamily: "Calibri"});
    this.add.text(25, 10, "Version: ", {fontFamily: "calibri", fill: "000000"});
    this.add.text(450, 220, "Mouse over a point for full data", {fontFamily: "calibri", fill: "000000"});

    if (this.oldDataPoints.length>0){
      this.drawDataPoints();
    }
  }

  createCuvettes(){
    this.emptyCuvette=this.add.image(100, 280, "empty cuvette");
    this.emptyCuvette.setScale(0.38);
    this.emptyCuvette.setTintFill(0x000000);

    this.fullCuvette=new cuvette(this, 100, 280, "fullCuvette");
    this.fullCuvette.setAlpha(0.0);
    this.fullCuvette.setScale(0.38);

    this.cuvetteOutline=new cuvette(this, 100, 280, "cuvetteOutline");
    this.cuvetteOutline.setAlpha(0.0);
    this.cuvetteOutline.setTintFill(0x000000);
    this.cuvetteOutline.setScale(0.38);

    this.spectro=this.physics.add.image(300, 280, "spectrophotometer");
    this.spectro.setScale(0.13);
    this.physics.add.overlap(this.spectro, this.fullCuvette, this.updateAbs, undefined, this);
  }

  createmLs(){
    this.mLA=this.add.image(245, 70, "mLsA");
    this.mLA.setScale(0.3);
    this.mLB=this.add.image(350, 70, "mLsB");
    this.mLB.setScale(0.3);
    this.mLC=this.add.image(245, 70, "mLsC");
    this.mLC.setScale(0.3);
    this.mLD=this.add.image(350, 70, "mLsD");
    this.mLD.setScale(0.3);    
    this.mLE=this.add.image(245, 70, "mLsE");
    this.mLE.setScale(0.3);
    this.mLF=this.add.image(350, 70, "mLsF");
    this.mLF.setScale(0.3);
    
    this.resetmLs();
    this.setmLs();
  }

  changeGraphs(){
    if (this.selectedRxn=='AB'){
      this.absGraphAB.setAlpha(1.0);
      this.absGraphCD.setAlpha(0.0);
      this.absGraphEF.setAlpha(0.0);
    }
    if (this.selectedRxn=="CD"){
      this.absGraphAB.setAlpha(0.0);
      this.absGraphCD.setAlpha(1.0);
      this.absGraphEF.setAlpha(0.0);
    }
    if (this.selectedRxn=="EF") {
      this.absGraphAB.setAlpha(0.0);
      this.absGraphCD.setAlpha(0.0);
      this.absGraphEF.setAlpha(1.0);
    }
  }

  resetmLs(){
    this.mLA.setAlpha(0.0);
    this.mLB.setAlpha(0.0);
    this.mLC.setAlpha(0.0);
    this.mLD.setAlpha(0.0);
    this.mLE.setAlpha(0.0);
    this.mLF.setAlpha(0.0);
  }

  createArrowButtons(){
    this.up1=new arrowButton(this, 200, 50, "upArrow", "up1");
    this.up1.on('pointerdown', ()=>this.changemLs("up1"));
    this.down1=new arrowButton(this, 200, 90, "downArrow", "down1");
    this.down1.on('pointerdown', ()=>this.changemLs("down1"));
    this.up1.setTintFill(0xFFD200);
    this.down1.setTintFill(0xFFD200);
  }
  

  update() {
    //console.log(this.dataList);
  }

  init(data){
    console.log("in init");
    let ar=data;
    this.selectedRxn=ar[0].toString();
    console.log("in init: "+ this.selectedRxn);
    if (ar.length>1){
      this.oldDataPoints=ar[1];
    }
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

  changeButtonTint(button: reactionButton){
    button.setTintFill(0x033dfc);
  }

  setmLs(){
    this.resetmLs();
    if (this.selectedRxn=="AB"){
      this.mLA.setAlpha(1.0);
      this.mLB.setAlpha(1.0);
    }
    if(this.selectedRxn=="CD"){
      this.mLC.setAlpha(1.0);
      this.mLD.setAlpha(1.0);
    }
    if (this.selectedRxn=="EF"){
      this.mLE.setAlpha(1.0);
      this.mLF.setAlpha(1.0);
    }
    console.log(this.selectedRxn);
  }

  findLR(){
    if ((this.mLs/3)<this.mLs2){
      return this.mLs/3;
    }
    else {
      return this.mLs2;
    }
  }

  //calculate the absorbance for both A and B, use whichever one is lower
  //6120 = molar extinction coefficient (uses Beer's law)
  findAbs(){
    if (this.selectedRxn=="AB"){
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
    this.changeCuvette();
    this.updateAbs();
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
    let x=464+MFB*304;
    let y=180-(this.abs/2.5)*124;


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
    if (this.selectedRxn=="AB"){
      this.mRLabel.text="Latest Data Point: \nX(A): "+ (1-this.findMF()).toFixed(2)+"\nX(B): "+(this.findMF()).toFixed(2)+"\nA: "+(this.abs.toFixed(2));
    }
    if (this.selectedRxn=="CD"){
      this.mRLabel.text="Latest Data Point: \nX(C): "+ (1-this.findMF()).toFixed(2)+"\nX(D): "+(this.findMF()).toFixed(2)+"\nA: "+(this.abs);
    }
    if (this.selectedRxn=="EF"){
      this.mRLabel.text="Latest Data Point: \nX(E): "+ (1-this.findMF()).toFixed(2)+"\nX(F): "+(this.findMF()).toFixed(2)+"\nA: "+(this.abs);
    }
  }
  
  clearGraph(){
    for (let i=this.dataList.length-1; i>-1; i--){
      this.dataList[i].setAlpha(0.0);
    }
  }

  changeCoefficients(version: number){
    this.version=version;
    if (this.selectedRxn=="AB"){
      if (this.version==1){
        this.Acoefficient=3;
        this.Bcoefficient=2;
      }
      if (this.version==2){
        this.Acoefficient=4;
        this.Bcoefficient=1;
      }
      if (this.version==3){
        this.Acoefficient=1;
        this.Bcoefficient=2;
      }
    }
    if (this.version==1){
      this.selectedVersion="button1";
      this.outline1.setAlpha(0.3);
      this.outline2.setAlpha(0.0);
      this.outline3.setAlpha(0.0);
    }
    if (this.version==2){
      this.selectedVersion="button2";
      this.outline1.setAlpha(0.0);
      this.outline2.setAlpha(0.3);
      this.outline3.setAlpha(0.0);
    }
    if (this.version==3){
      this.selectedVersion="button3";
      this.outline1.setAlpha(0.0);
      this.outline2.setAlpha(0.0);
      this.outline3.setAlpha(0.3);
    }

    this.mLs=0;
    this.mLs2=0;
    this.clearGraph();
    this.mRLabel.text="";
  }

  goBack(){
    if (this.selectedRxn=="AB"){
      this.scene.start('abScene');
    }
    if(this.selectedRxn=="CD"){
      this.scene.start('cdScene');
    }
    if(this.selectedRxn=="EF"){
      this.scene.start('efScene');
    }
  }

  goToMain(){
    this.scene.start('MainScene');
  }

  goToHelp(){
    this.scene.start("specHelpScene", [this.selectedRxn, this.dataList])
  }

  drawDataPoints(){
    console.log("in draw DP");
    for (let i=0; i<this.oldDataPoints.length; i++ ){
      console.log(this.oldDataPoints[i].getDataValue());
      let newDP=this.oldDataPoints[i];
      let DP = new dataPoint(this, newDP.getX(), newDP.getY(), newDP.getDataValue(), newDP.getMF(), this.selectedRxn, "Spec");

    }
  }
}
