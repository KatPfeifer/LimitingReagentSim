import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import reactionHighlights from '../objects/reactionHighlights';
import arrowButton from '../objects/arrowButton';
import dataPoint from '../objects/dataPoint';
import productImage from '../objects/productImage';
import { vial } from '../objects/vial';
import button from '../objects/button';
import arrowIndic from '../objects/arrowIndic';
import buttonOutline from '../objects/buttonOutline';

export default class PrecipScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private selectedRxn: string;
  private mLsLabel: any; //figure out type of labels
  private mLsLabel2: any;
  private mLs: any;
  private mLs2: any;
  private up1: arrowButton;
  private down1: arrowButton;
  private mixButton: any;
  private background2: Phaser.GameObjects.Image;
  private graphButton: any;
  private dataList: any;
  private newestDP: dataPoint;
  private mRLabel: any;
  private sPLabel: any;
  private precipGraphAB: Phaser.GameObjects.Image;
  private precipGraphCD: Phaser.GameObjects.Image;
  private precipGraphEF: Phaser.GameObjects.Image;
  private mass: number;
  //mass of empty vial = 1.30g;
  private emptyVial: Phaser.GameObjects.Image;
  private fullVial: Phaser.GameObjects.Image;
  private balance: Phaser.Physics.Arcade.Image;
  private massLabel: any; //figure out type of bitmap;
  private backButton: button;
  private mLA: Phaser.GameObjects.Image;
  private mLB: Phaser.GameObjects.Image;
  private mLC: Phaser.GameObjects.Image;
  private mLD: Phaser.GameObjects.Image;
  private mLE: Phaser.GameObjects.Image;
  private mLF: Phaser.GameObjects.Image;
  private mainButton: button;
  private molarity: number;
  private Ccoefficient: number;
  private Dcoefficient: number;
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
  private mixOutline: buttonOutline;
  private addOutline: buttonOutline;
  private helpButton: button;
  private helpOutline: buttonOutline;
  private oldDataPoints: any;

  constructor() {
    super({ key: 'PrecipScene' });
  }

  create() {
    this.molarity=0.8;
    this.Ccoefficient=3;
    this.Dcoefficient=1;
    this.mass=0.0001;
    this.version=1;
    this.selectedVersion="button1";

    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    this.background2=this.add.image(600, 200, "bluebackground");
    this.background2.setScale(2.0);

    this.mLs=0;
    this.mLsLabel = this.add.bitmapText(195, 55, "calibri");
    this.mLsLabel.fontSize=30;
    this.mLsLabel.text=this.mLs.toString()+"";

    this.mLs2=20;
    this.mLsLabel2=this.add.bitmapText(295, 55, "calibri");
    this.mLsLabel2.fontSize=30;
    this.mLsLabel2.text=this.mLs2.toString();

    this.mRLabel=this.add.bitmapText(450, 250, "calibri");
    this.mRLabel.fontSize=20;

    this.sPLabel=this.add.bitmapText(600, 250, "calibri");
    this.sPLabel.fontSize=20;

    this.createArrowButtons();
    this.createGraphs();
    this.createmLs();

    this.balance=this.physics.add.image(300, 300, "scale");
    this.balance.setScale(0.50);

    this.emptyVial=this.add.image(100, 275, "emptyVial");
    this.emptyVial.setScale(0.4);

    this.fullVial=new vial(this, 100, 275);
    
    this.physics.add.overlap(this.fullVial, this.balance, ()=> this.updateMassLabel(), undefined, this);

    this.massLabel=this.add.bitmapText(290, 350, "calibri");
    this.massLabel.fontSize=20;
    this.massLabel.setTintFill(0x000000);
    this.massLabel.text=this.mass.toFixed(2)+" g";

   this.dataList=[];

   this.add.text(180, 120, "[All solutions]=10.0M", {fontFamily: "calibri", fill: "000000"});
   this.add.text(20, 325, "Vial + cap mass: 1.30g", {fontFamily: "calibri", fill: "000000"});

   this.helpButton=new button(this, 40, 375, "helpButton", 0.7);
   this.helpButton.on('pointerdown', ()=>this.goToHelp(), this);
   this.helpOutline = new buttonOutline(this, 40, 375, "helpButton", 0.7, 0x4a0101);
   this.helpButton.on('pointerover', ()=>this.helpOutline.enterHoverState(), this);
   this.helpButton.on('pointerout', ()=>this.helpOutline.exitHoverState("word"), this);

   this.mixButton=new button(this, 200, 170, "mixSolBut", 0.6);
   this.mixButton.on('pointerdown', ()=>this.findMass(), this);
   this.mixOutline = new buttonOutline(this, 200, 170, "mixSolBut", 0.6, 0x184a01);
   this.mixButton.on('pointerover', ()=>this.mixOutline.enterHoverState(), this);
   this.mixButton.on('pointerout', ()=>this.mixOutline.exitHoverState("word"), this);

   this.graphButton= new button(this, 340, 170, "graphButton", 0.6);
   this.graphButton.on('pointerdown', ()=>this.graphPoint(), this);
   this.addOutline = new buttonOutline(this, 340, 170, "graphButton", 0.6, 0x4a0801);
   this.graphButton.on('pointerover', ()=>this.addOutline.enterHoverState(), this);
   this.graphButton.on('pointerout', ()=>this.addOutline.exitHoverState("word"), this);

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

    this.add.text(25, 10, "Version: ", {fontFamily: "calibri", fill: "000000"});
    this.add.text(450, 220, "Mouse over a point for full data", {fontFamily: "calibri", fill: "000000"});
    this.add.text(190, 5, "Adjust mLs of\nreactant solution:", {fill: "000000", fontFamily: "Calibri"});


    if (this.oldDataPoints.length>0){
      this.drawDataPoints();
    }
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

  createGraphs(){
    this.precipGraphAB=this.add.image(600, 120, "precipGraphAB");
    this.precipGraphAB.setScale(0.65);
    this.precipGraphCD=this.add.image(600, 120, "precipGraphCD");
    this.precipGraphCD.setScale(0.65);
    this.precipGraphEF=this.add.image(600, 120, "precipGraphCD");
    this.precipGraphEF.setScale(0.65);
    this.changeGraphs();
  }

  changeGraphs(){
    console.log("in change graphs");
    if (this.selectedRxn=='AB'){
      this.precipGraphAB.setAlpha(1.0);
      this.precipGraphCD.setAlpha(0.0);
      this.precipGraphEF.setAlpha(0.0);
    }
    if (this.selectedRxn=="CD"){
      this.precipGraphAB.setAlpha(0.0);
      this.precipGraphCD.setAlpha(1.0);
      this.precipGraphEF.setAlpha(0.0);
    }
    if (this.selectedRxn=="EF"){
      this.precipGraphAB.setAlpha(0.0);
      this.precipGraphCD.setAlpha(0.0);
      this.precipGraphEF.setAlpha(1.0);
    }
  }

  update() {
  }

  init(data){
    let ar=data;
    this.selectedRxn=ar[0].toString();
    if (ar.length>1){
      this.oldDataPoints=ar[1];
    }
  }

  doDrag(pointer){
    this.fullVial.x=pointer.x;
    this.fullVial.y=pointer.y;
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

  setmLs(){
    console.log(this.selectedRxn);
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
  }

  //LR = Limiting Reactant. Ratio for reaction is 2:3, based on reaction to form strontium phosphate
  findLR(){
    if ((this.mLs/2)<this.mLs2/3){
      return this.mLs/2;
    }
    else {
      return this.mLs2/3;
    }
  }

  findMass(){
    console.log("in find mass");
    console.log(this.selectedRxn);
    if (this.selectedRxn=="CD"){
      let C =(this.mLs*this.molarity*452.8)/(1000*this.Ccoefficient);
      let D=(this.mLs2*this.molarity*452.8)/(1000*this.Dcoefficient);
      if (C<=D){
        this.mass=C;
      }
      else {
        this.mass=D;
      }
      console.log(this.mass);
      this.fullVial.setAlpha(1.0);
      this.emptyVial.setAlpha(0.0);
    }
    else {
      this.mass=0.000001;
    }
    
    this.updateMassLabel();
  }

  updateMassLabel(){
    //mass of vial = 1.3g
    this.massLabel.text=(this.mass+1.3).toFixed(2)+ " g";
  }

  graphPoint(){
    //MFB = mole fraction B
    let MFB=this.findMF();
    let x=463+MFB*303;
    let y=181-124*(this.mass/4);

    this.newestDP = new dataPoint(this, x, y, this.mass, MFB+.000001, this.selectedRxn, "Precip"); 
    this.dataList.push(this.newestDP);

    this.updateMRLabel();
    this.emptyVial.setAlpha(1.0);
    this.fullVial.setAlpha(0.0);
    this.fullVial.x=100;
    this.fullVial.y=275;
    this.massLabel.text="0.00 g";
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
      this.mRLabel.text="Latest Data Point: \nX(A): "+ (1-this.findMF()).toFixed(2)+"\nX(B): "+(this.findMF()).toFixed(2)+"\nPM: "+(this.mass.toFixed(2));
    }
    if (this.selectedRxn=="CD"){
      this.mRLabel.text="Latest Data Point: \nX(C): "+ (1-this.findMF()).toFixed(2)+"\nX(D): "+(this.findMF()).toFixed(2)+"\nPM: "+(this.mass.toFixed(2));
    }
    if (this.selectedRxn=="EF"){
      this.mRLabel.text="Latest Data Point: \nX(E): "+ (1-this.findMF()).toFixed(2)+"\nX(F): "+(this.findMF()).toFixed(2)+"\nPM: "+(this.mass.toFixed(2));
    }
  }


  clearGraph(){
    console.log("in clear graph")
    for (let i=this.dataList.length-1; i>-1; i--){
      this.dataList[i].setAlpha(0.0);
    }
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

  changeCoefficients(version: number){
    this.version=version;
    if (this.selectedRxn=="CD"){
      if (this.version==1){
        this.Ccoefficient=3;
        this.Dcoefficient=1;
      }
      if (this.version==2){
        this.Ccoefficient=1;
        this.Dcoefficient=1;
      }
      if (this.version==3){
        this.Ccoefficient=2;
        this.Dcoefficient=1;
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
    this.mLs2=20;
    this.clearGraph();
    this.mRLabel.text="";
  }

  goToMain(){
    this.scene.start('MainScene');
  }

  goToHelp(){
    this.scene.start("precipHelpScene", [this.selectedRxn, this.dataList])
  }

  drawDataPoints(){
    console.log("in draw DP");
    for (let i=0; i<this.oldDataPoints.length; i++ ){
      console.log(this.oldDataPoints[i].getDataValue());
      let newDP=this.oldDataPoints[i];
      let DP = new dataPoint(this, newDP.getX(), newDP.getY(), newDP.getDataValue(), newDP.getMF(), this.selectedRxn, "Precip");

    }
  }
}
