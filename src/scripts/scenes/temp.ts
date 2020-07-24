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
  private background: Phaser.GameObjects.Image;;
  private selectedRxn: string;
  private mLsLabel: any; //figure out type of labels
  private mLsLabel2: any;
  private mLs: any;
  private mLs2: any;
  private up1: arrowButton;
  private down1: arrowButton;
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
  private mainButton: button;



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

    this.mLs2=20;
    this.mLsLabel2=this.add.bitmapText(300, 60, "pixelFont");
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

    this.createArrowButtons();
    this.createGraphs();
    this.createmLs();

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
    this.backButton.on('pointerdown', ()=>this.goBack(), this);

    this.mainButton=new button(this, 650, 375, "mainButton", 0.7);
    this.mainButton.on('pointerdown', ()=>this.goToMain(), this);


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
    console.log("in init");
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
    this.fullBeaker.setAlpha(0.0);
    this.emptyBeaker.setAlpha(1.0);
    this.temp=25.0001;
    this.tempLabel.text=this.temp.toString().substring(0,4);
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
}
