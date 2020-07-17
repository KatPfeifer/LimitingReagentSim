import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import arrowButton from '../objects/arrowButton';
import { cuvette } from '../objects/cuvette';
import dataPoint from '../objects/dataPoint';
import reactionHighlights from '../objects/reactionHighlights';

export default class TempScene extends Phaser.Scene {
  private ABRxn: any; //need to figure out the type of an image
  private ABRxnHighlight: any;
  private CDRxn: any;
  private CDRxnHighlight: any;
  private EFRxn: any;
  private EFRxnHighlight: any;
  private background: any;
  private selectedRxn: any;
  private specButton: any;
  private tempButton: any;
  private precipButton: any;
  private mLsLabel: any;
  private mLsLabel2: any;
  private mLs: any;
  private mLs2: any;
  private up1: any;
  private up2: any;
  private down1: any;
  private down2: any;
  private mixButton: any;
  private absLabel: any;
  private background2: any;
  private graphButton: any;
  private dataList: any;
  private newestDP: any;
  private mRLabel: any;
  private sPLabel: any;
  private temp: number;
  private tempChange: number;
  private tempGraphAB: any;
  private tempGraphCD: any;
  private tempGraphEF: any;
  private emptyBeaker: any;
  private fullBeaker: any;
  private thermoHead: any;
  private tempLabel: any;

  constructor() {
    super({ key: 'TempScene' });
  }

  create() {
    this.temp=25.001;
    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    this.background2=this.add.image(600, 200, "bluebackground");
    this.background2.setScale(2.0);

    this.mLs=0;
    this.mLsLabel = this.add.bitmapText(195, 60, "pixelFont");
    this.mLsLabel.fontSize=30;
    this.mLsLabel.text=this.mLs.toString()+"";
    this.mLsLabel.setTintFill(0x000000);

    this.mLs2=0;
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

    this.add.text(0, 0, "Temp Scene");

    this.add.text(50, 50, "Pick a \nreaction:", {fill: "#fffffff"});
    this.ABRxn=new reactionButton(this, 80, 100, "A+B", 0.3);
    this.ABRxn.on('pointerdown', ()=>this.ABPicked(), this);
    this.ABRxnHighlight= new reactionHighlights(this, 80, 100, "A+B");
    this.ABRxnHighlight.setAlpha(0.0);


    this.CDRxn=new reactionButton(this, 80, 120, "C+D", 0.3);
    this.CDRxn.on('pointerdown', ()=>this.CDPicked(), this);
    this.CDRxnHighlight = new reactionHighlights(this, 80, 120, "C+D");
    this.CDRxnHighlight.setAlpha(0.0);

    this.EFRxn=new reactionButton(this, 80, 140, "E+F", 0.3);
    this.EFRxn.on('pointerdown', ()=>this.EFPicked(), this);
    this.EFRxnHighlight=new reactionHighlights(this, 80, 140, "E+F");
    this.EFRxnHighlight.setAlpha(0.0);

    /*this.add.text(200, 50, "Pick a method \nof analysis:", {fill: "#fffffff"});
    this.specButton=new analysisButton(this, 270, 100, "spec", 0.4);
    this.tempButton=new analysisButton(this, 245, 120, "temp", 0.26);
    this.precipButton=new analysisButton(this, 258, 140, "precip", 0.3);
    */

    this.createArrowButtons();
    this.createGraphs();

    this.dataList=[];

    this.mixButton=this.add
    .image(250, 230, "mixSolBut")
    .setScale(0.5)
    .setInteractive();
    this.mixButton.on('pointerdown', ()=>this.findTemp(), this);

    this.graphButton=this.add
    .image(360, 230, "graphButton")
    .setScale(0.5)
    .setInteractive();
    this.graphButton.on('pointerdown', ()=>this.graphPoint(), this);

    this.emptyBeaker=this.add.image(120, 250, "emptyBeaker");
    this.emptyBeaker.setScale(0.55);

    this.fullBeaker=this.add.image(120, 250, "fullBeaker");
    this.fullBeaker.setScale(0.55);
    this.fullBeaker.setAlpha(0.0);

    this.thermoHead=this.add.image(300, 310, "thermoHead");
    this.thermoHead.setScale(0.28);

    this.tempLabel=this.add.bitmapText(310, 310, "pixelFont");
    this.tempLabel.fontSize=30;
    this.tempLabel.setTintFill(0x000000);
    this.tempLabel.text=this.temp.toString().substring(0,4)+ " C";
  }

  createArrowButtons(){
    this.up1=new arrowButton(this, 200, 50, "upArrow", "up1");
    this.up1.on('pointerdown', ()=>this.changemLs("up1"));
    this.down1=new arrowButton(this, 200, 90, "downArrow", "down1");
    this.down1.on('pointerdown', ()=>this.changemLs("down1"));
    this.up2=new arrowButton(this, 310, 50, "upArrow", "up2");
    this.up2.on('pointerdown', ()=>this.changemLs("up2"));
    this.down2=new arrowButton(this, 310, 90, "downArrow", "down2");
    this.down2.on('pointerdown', ()=>this.changemLs("down2"));
  }

  createGraphs(){
    this.tempGraphAB=this.add.image(600, 120, "tempGraphAB");
    this.tempGraphAB.setScale(0.7);
    this.tempGraphCD=this.add.image(600, 120, "tempGraphCD");
    this.tempGraphCD.setScale(0.7);
    this.tempGraphCD.setAlpha(0.0);
    this.tempGraphEF=this.add.image(600, 120, "tempGraphCD");
    this.tempGraphEF.setScale(0.7);
    this.tempGraphEF.setAlpha(0.0);
  }

  update() {
  }
  changemLs(name: string){
    if (name=="up1"){
      this.mLs+=1;
      this.mLsLabel.text=this.mLs.toString();
    }
    if (name=="up2"){
      this.mLs2+=1;
      this.mLsLabel2.text=this.mLs2.toString();
    }
    if (name=="down1"&&this.mLs>0){
      this.mLs-=1;
      this.mLsLabel.text=this.mLs.toString();
    }
    if (name=="down2"&&this.mLs2>0){
      this.mLs2-=1;
      this.mLsLabel2.text=this.mLs2.toString();
    }
  }

  ABPicked(){
    this.selectedRxn="AB";
    this.resetHighlights();
    this.ABRxnHighlight.setAlpha(1.0);
    console.log(this.selectedRxn + "was picked");
  }

  CDPicked(){
    this.selectedRxn="CD";
    this.resetHighlights();
    this.CDRxnHighlight.setAlpha(1.0);
  }

  EFPicked(){
    this.selectedRxn="EF";
    this.resetHighlights();
    this.EFRxnHighlight.setAlpha(1.0);
  }
  
  resetHighlights(){
    this.ABRxnHighlight.setAlpha(0.0);
    this.CDRxnHighlight.setAlpha(0.0);
    this.EFRxnHighlight.setAlpha(0.0);
  }

/*
  changeButtonTint(button: reactionButton){
    button.setTintFill(0x033dfc);
    console.log("here");
  }
  */

  //LR = Limiting Reactant. Ratio for reaction is 1:2
  findLR(){
    if ((this.mLs)<this.mLs2/2){
      return this.mLs;
    }
    else {
      return this.mLs2/2;
    }
  }

  //Uses 485000J/mol - an arbitrary enthalpy of formation - shows an endothermic reaction
  //4.19 is the specific heat of water
  findTemp(){
    let LR=this.findLR();
    let mol=(LR*0.1)/1000;
    let Js=mol*485000;
    this.tempChange=((-1)*Js)/((this.mLs+this.mLs2)*4.19);
    this.temp=25+this.tempChange;
    console.log(this.tempChange);
    if (this.selectedRxn=="AB"||this.selectedRxn=="CD"){
      this.temp=25;
      this.tempChange=0;
    }
    this.updateTempLabel();
    this.fullBeaker.setAlpha(1.0);
  }

  graphPoint(){
    let MFB=this.findMF();
    let x=480+MFB*278;
    let y=66-108*(this.tempChange/4);

    this.newestDP = new dataPoint(this, x, y, this.tempChange, MFB); 
    this.newestDP.on('pointerover', ()=>this.updateSPLabel(), this);
    this.newestDP.on('pointerout', ()=>this.clearSPLabel(), this);
    this.dataList.push(this.newestDP);

    this.updateMRLabel();
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
      this.mRLabel.text="Latest Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.tempChange.toString().substring(0,4));
    }
    if (this.selectedRxn=="CD"){
      this.mRLabel.text="Latest Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.tempChange);
    }
    if (this.selectedRxn=="EF"){
      this.mRLabel.text="Latest Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.tempChange.toString().substring(0,4));
    }
  }

  updateSPLabel(){
    if (this.selectedRxn=="AB"){
      this.sPLabel.text="Selected Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.tempChange.toString().substring(0,4));
    }
    if (this.selectedRxn=="CD"){
      this.sPLabel.text="Selected Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.tempChange);
    }
    if (this.selectedRxn=="EF"){
      this.sPLabel.text="Selected Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.tempChange.toString().substring(0,4));
    }
  }

  clearSPLabel(){
    this.sPLabel.text="";
  }

  updateTempLabel(){
    console.log("here");
    this.tempLabel.text=this.temp.toString().substring(0,4)+ " C";
  }
}
