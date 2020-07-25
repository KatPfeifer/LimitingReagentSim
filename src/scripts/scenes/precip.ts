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
  private arrow1: arrowIndic;
  private arrow2: arrowIndic;
  private arrow3: arrowIndic;
  private selectedVersion: string;

  constructor() {
    super({ key: 'PrecipScene' });
  }

  create() {
    this.molarity=2;
    this.Ccoefficient=3;
    this.Dcoefficient=1;
    this.mass=0.0001;
    this.version=1;
    this.selectedVersion="arrow1";

    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    this.background2=this.add.image(600, 200, "bluebackground");
    this.background2.setScale(2.0);

    //this.add.text(0, 0, "Precip Scene");

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

    this.mRLabel=this.add.bitmapText(450, 250, "pixelFont");
    this.mRLabel.fontSize=20;
    this.mRLabel.setTintFill(0x000000);

    this.sPLabel=this.add.bitmapText(600, 250, "pixelFont");
    this.sPLabel.fontSize=20;
    this.sPLabel.setTintFill(0x000000);

    this.createArrowButtons();
    this.createGraphs();
    this.createmLs();

    this.balance=this.physics.add.image(300, 300, "scale");
    this.balance.setScale(0.50);

    this.emptyVial=this.add.image(100, 300, "emptyVial");
    this.emptyVial.setScale(0.4);

    this.fullVial=new vial(this, 100, 300);
    
    this.physics.add.overlap(this.fullVial, this.balance, ()=> this.updateMassLabel(), undefined, this);

    this.massLabel=this.add.bitmapText(290, 350, "pixelFont");
    this.massLabel.fontSize=20;
    this.massLabel.setTintFill(0x000000);
    this.massLabel.text=this.mass.toString().substring(0,4)+" g";

   this.dataList=[];

   this.add.text(180, 120, "[All solutions]=10.0M", {fill: "000000"});
   this.add.text(20, 350, "Vial + cap mass: \n1.30g", {fill: "000000"});

   this.mixButton=this.add
   .image(250, 170, "mixSolBut")
   .setScale(0.5)
   .setInteractive();
   this.mixButton.on('pointerdown', ()=>this.findMass(), this);

   this.graphButton=this.add
   .image(360, 170, "graphButton")
   .setScale(0.5)
   .setInteractive();
   this.graphButton.on('pointerdown', ()=>this.graphPoint(), this);

   this.backButton=new button(this, 750, 375, "backButton", 0.7);
   this.backButton.on('pointerdown', ()=>this.goBack(), this);

   this.mainButton=new button(this, 650, 375, "mainButton", 0.7);
   this.mainButton.on('pointerdown', ()=>this.goToMain(), this);

   this.button1=new button(this, 50, 50, "button1", 0.7);
   this.button1.on('pointerdown', ()=>this.changeCoefficients(1), this);
   this.button2=new button(this, 50, 100, "button2", 0.7);
   this.button2.on('pointerdown', ()=>this.changeCoefficients(2), this);
   this.button3=new button(this, 50, 150, "button3", 0.7);
   this.button3.on('pointerdown', ()=>this.changeCoefficients(3), this);

   this.add.text(10, 10, "Version: ", {fill: "000000"});

   this.arrow1=new arrowIndic(this, 100, 50, "arrow1");
   this.button1.on('pointerover', ()=>this.arrow1.enterHoverState(), this);
   this.button1.on('pointerout', ()=>this.arrow1.exitHoverState(this.selectedVersion), this);

   this.arrow2=new arrowIndic(this, 100, 100, "arrow2");
   this.button2.on('pointerover', ()=>this.arrow2.enterHoverState(), this);
   this.button2.on('pointerout', ()=>this.arrow2.exitHoverState(this.selectedVersion), this);

   this.arrow3=new arrowIndic(this, 100, 150, "arrow3");
   this.button3.on('pointerover', ()=>this.arrow3.enterHoverState(), this);
   this.button3.on('pointerout', ()=>this.arrow3.exitHoverState(this.selectedVersion), this);

   this.arrow2.setAlpha(0.0);
   this.arrow3.setAlpha(0.0);
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
      this.mass=0.00;
    }
    
  }

  updateMassLabel(){
    //mass of vial = 1.3g
    this.massLabel.text=(this.mass+1.3).toString().substring(0,4)+ " g";
  }

  graphPoint(){
    //MFB = mole fraction B
    let MFB=this.findMF();
    let x=463+MFB*303;
    let y=182-124*(this.mass/4);

    this.newestDP = new dataPoint(this, x, y, this.mass, MFB); 
    this.newestDP.on('pointerover', ()=>this.updateSPLabel(), this);
    this.newestDP.on('pointerout', ()=>this.clearSPLabel(), this);
    this.dataList.push(this.newestDP);

    this.updateMRLabel();
    this.emptyVial.setAlpha(1.0);
    this.fullVial.setAlpha(0.0);
    this.fullVial.x=100;
    this.fullVial.y=300;
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
      this.mRLabel.text="Latest Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nPM: "+(this.mass.toString().substring(0,4));
    }
    if (this.selectedRxn=="CD"){
      this.mRLabel.text="Latest Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nPM: "+(this.mass.toString().substring(0,4));
    }
    if (this.selectedRxn=="EF"){
      this.mRLabel.text="Latest Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nPM: "+(this.mass.toString().substring(0,4));
    }
  }

  updateSPLabel(){
    if (this.selectedRxn=="AB"){
      this.sPLabel.text="Selected Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nPM: "+(this.mass.toString().substring(0,4));
    }
    if (this.selectedRxn=="CD"){
      this.sPLabel.text="Selected Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nPM: "+(this.mass.toString().substring(0,4));
    }
    if (this.selectedRxn=="EF"){
      this.sPLabel.text="Selected Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nPM: "+(this.mass.toString().substring(0,4));
    }
  }

  clearSPLabel(){
    this.sPLabel.text="";
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
      this.selectedVersion="arrow1";
      this.arrow1.setAlpha(1.0);
      this.arrow2.setAlpha(0.0);
      this.arrow3.setAlpha(0.0);
    }
    if (this.version==2){
      this.selectedVersion="arrow2";
      this.arrow1.setAlpha(0.0);
      this.arrow2.setAlpha(1.0);
      this.arrow3.setAlpha(0.0);
    }
    if (this.version==3){
      this.selectedVersion="arrow3";
      this.arrow1.setAlpha(0.0);
      this.arrow2.setAlpha(0.0);
      this.arrow3.setAlpha(1.0);
    }

    this.mLs=0;
    this.mLs2=20;
    this.clearGraph();
    this.mRLabel.text="";
  }

  goToMain(){
    this.scene.start('MainScene');
  }
}
