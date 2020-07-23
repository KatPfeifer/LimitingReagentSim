import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import arrowButton from '../objects/arrowButton';
import { cuvette } from '../objects/cuvette';
import dataPoint from '../objects/dataPoint';
import reactionHighlights from '../objects/reactionHighlights';
import productImage from '../objects/productImage';
import button from '../objects/button';

export default class TempScene extends Phaser.Scene {
  private ABRxn: reactionButton; //need to figure out the type of an image
  private ABRxnHighlight: reactionHighlights;
  private ABPdt: reactionButton;
  private ABPdtImage: Phaser.GameObjects.Image;
  private CDRxn: reactionButton;
  private CDRxnHighlight: reactionHighlights;
  private CDPdtImage: Phaser.GameObjects.Image;
  private CDPdt: reactionButton;
  private EFRxn: reactionButton;
  private EFRxnHighlight: reactionHighlights;
  private EFPdt: reactionButton;
  private EFPdtImage: Phaser.GameObjects.Image;
  private background: Phaser.GameObjects.Image;;
  private selectedRxn: string;
  private mLsLabel: any; //figure out type of labels
  private mLsLabel2: any;
  private mLs: any;
  private mLs2: any;
  private up1: arrowButton;
  private up2: arrowButton;
  private down1: arrowButton;
  private down2: arrowButton;
  private mixButton: any;
  private absLabel: any;
  private background2: Phaser.GameObjects.Image;
  private graphButton: any;
  private dataList: any;
  private newestDP: dataPoint;
  private mRLabel: any;
  private sPLabel: any;
  private temp: number;
  private tempChange: number;
  private tempGraphAB: Phaser.GameObjects.Image;
  private tempGraphCD: Phaser.GameObjects.Image;
  private tempGraphEF: Phaser.GameObjects.Image;
  private emptyBeaker: Phaser.GameObjects.Image;
  private fullBeaker: Phaser.GameObjects.Image;
  private thermoHead: Phaser.GameObjects.Image;
  private tempLabel: any;
  private backButton: button;
  private mLA: Phaser.GameObjects.Image;
  private mLB: Phaser.GameObjects.Image;
  private mLC: Phaser.GameObjects.Image;
  private mLD: Phaser.GameObjects.Image;
  private mLE: Phaser.GameObjects.Image;
  private mLF: Phaser.GameObjects.Image;


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

    //this.add.text(0, 0, "Temp Scene");

    this.add.text(50, 50, "Pick a \nreaction:", {fill: "#fffffff"});
    this.ABRxn=new reactionButton(this, 80, 100, "A+B", 0.3);
    this.ABRxn.on('pointerdown', ()=>this.ABPicked(), this);
    this.ABRxnHighlight= new reactionHighlights(this, 80, 100, "A+B");
    this.ABRxnHighlight.setAlpha(0.0);
    this.ABPdt=new reactionButton(this, 135, 100, "Pdt", 0.4);
    this.ABPdt.on('pointerdown', ()=>this.showABPdt(), this);

    this.CDRxn=new reactionButton(this, 80, 120, "C+D", 0.3);
    this.CDRxn.on('pointerdown', ()=>this.CDPicked(), this);
    this.CDRxnHighlight = new reactionHighlights(this, 80, 120, "C+D");
    this.CDRxnHighlight.setAlpha(0.0);
    this.CDPdt=new reactionButton(this, 135, 120, "Pdt", 0.4);
    this.CDPdt.on('pointerdown', ()=>this.showCDPdt(), this);
    

    this.EFRxn=new reactionButton(this, 80, 140, "E+F", 0.3);
    this.EFRxn.on('pointerdown', ()=>this.EFPicked(), this);
    this.EFRxnHighlight=new reactionHighlights(this, 80, 140, "E+F");
    this.EFRxnHighlight.setAlpha(0.0);
    this.EFPdt = new reactionButton(this, 135, 140, "Pdt", 0.4);
    this.EFPdt.on('pointerdown', ()=>this.showEFPdt(), this);

    this.createArrowButtons();
    this.createGraphs();

    this.dataList=[];

    this.mixButton=this.add
    .image(250, 170, "mixSolBut")
    .setScale(0.5)
    .setInteractive();
    this.mixButton.on('pointerdown', ()=>this.findTemp(), this);

    this.graphButton=this.add
    .image(360, 170, "graphButton")
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
    
    this.backButton=new button(this, 750, 375, "backButton", 0.7);
    this.backButton.on('pointerdown', ()=>this.goToMain(), this);

    this.ABPdtImage=new productImage(this, 400, 200, "ABPdt", 0.4);
    this.CDPdtImage=new productImage(this, 400, 200, "CDPdt", 0.5);
    this.EFPdtImage=new productImage(this, 400, 200, "EFPdt", 0.8);

    this.add.text(180, 120, "[All solutions]=0.1M", {fill: "000000"});
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

  init(data){
    let ar=data;
    this.selectedRxn=ar[0].toString();
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
    this.clearGraph();
    this.selectedRxn="AB";
    this.resetHighlights();
    this.ABRxnHighlight.setAlpha(1.0);
    console.log(this.selectedRxn + "was picked");
    this.resetmLs();
    this.mLA.setAlpha(1.0);
    this.mLB.setAlpha(1.0);
  }

  showABPdt(){
    this.ABPdtImage.setAlpha(1.0);
  }

  CDPicked(){
    this.clearGraph();
    this.selectedRxn="CD";
    this.resetHighlights();
    this.CDRxnHighlight.setAlpha(1.0);
    this.resetmLs();
    this.mLC.setAlpha(1.0);
    this.mLD.setAlpha(1.0);
  }

  showCDPdt(){
    this.CDPdtImage.setAlpha(1.0);
  }

  EFPicked(){
    this.clearGraph();
    this.selectedRxn="EF";
    this.resetHighlights();
    this.EFRxnHighlight.setAlpha(1.0);
    this.resetmLs();
    this.mLE.setAlpha(1.0);
    this.mLF.setAlpha(1.0);
  }

  showEFPdt(){
    this.EFPdtImage.setAlpha(1.0);
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

  clearGraph(){
    console.log("in clear graph")
    for (let i=this.dataList.length-1; i>-1; i--){
      this.dataList[i].setAlpha(0.0);
    }
  }

  goToMain(){
    this.scene.start('MainScene');
  }
}
