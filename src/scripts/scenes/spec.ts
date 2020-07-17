import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import arrowButton from '../objects/arrowButton';
import { cuvette } from '../objects/cuvette';
import dataPoint from '../objects/dataPoint';
import reactionHighlights from '../objects/reactionHighlights';

export default class SpecScene extends Phaser.Scene {
  private ABRxn: any;
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
  private abs: any;
  private emptyCuvette: any;
  private fullCuvette: any;
  private cuvetteOutline: any;
  private spectro: any;
  private absLabel: any;
  private background2: any;
  private absGraphAB: any;
  private absGraphCD: any;
  private absGraphEF: any;
  private graphButton: any;
  private dataList: any;
  private newestDP: any;
  private mRLabel: any;
  private sPLabel: any;

  constructor() {
    super({ key: 'SpecScene' });
  }

  create() {
    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    this.background2=this.add.image(600, 200, "bluebackground");
    this.background2.setScale(2.0);

    this.abs=0;

    this.mLs=0;
    this.mLsLabel = this.add.bitmapText(55, 200, "pixelFont");
    this.mLsLabel.fontSize=30;
    this.mLsLabel.text=this.mLs.toString()+"";
    this.mLsLabel.setTintFill(0x000000);

    this.mLs2=0;
    this.mLsLabel2=this.add.bitmapText(195, 200, "pixelFont");
    this.mLsLabel2.fontSize=30;
    this.mLsLabel2.text=this.mLs2.toString();
    this.mLsLabel2.setTintFill(0x000000);

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

    this.absGraphAB=this.add.image(600, 120, "absGraphAB");
    this.absGraphAB.setScale(0.7);
    this.absGraphCD=this.add.image(600, 120, "absGraphCD");
    this.absGraphCD.setScale(0.7);
    this.absGraphCD.setAlpha(0.0);
    this.absGraphEF=this.add.image(600, 120, "absGraphEF");
    this.absGraphEF.setScale(0.7);
    this.absGraphEF.setAlpha(0.0);


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
    

    this.add.text(200, 50, "Pick a method \nof analysis:", {fill: "#fffffff"});
    this.specButton=new analysisButton(this, 270, 100, "spec", 0.4);
    this.tempButton=new analysisButton(this, 245, 120, "temp", 0.26);
    this.precipButton=new analysisButton(this, 258, 140, "precip", 0.3);

    this.createArrowButtons();

    this.mixButton=this.add
    .image(360, 200, "mixSolBut")
    .setScale(0.5)
    .setInteractive();
    this.mixButton.on('pointerdown', ()=>this.findAbs(), this);

    this.graphButton=this.add
    .image(360, 230, "graphButton")
    .setScale(0.5)
    .setInteractive();
    this.graphButton.on('pointerdown', ()=>this.graphPoint(), this);
      
    this.createCuvettes();
    

    this.dataList=[];
  }

  createCuvettes(){
    this.emptyCuvette=this.add.image(100, 300, "empty cuvette");
    this.emptyCuvette.setScale(0.15);

    this.fullCuvette=new cuvette(this, 100, 300, "fullCuvette");
    this.fullCuvette.setAlpha(0.0);

    this.cuvetteOutline=new cuvette(this, 100, 300, "cuvetteOutline");
    this.cuvetteOutline.setAlpha(0.0);

    this.spectro=this.physics.add.image(300, 300, "spectrophotometer");
    this.spectro.setScale(0.1);
    this.physics.add.overlap(this.spectro, this.fullCuvette, this.updateAbs, undefined, this);
  }

  createArrowButtons(){
    this.up1=new arrowButton(this, 60, 190, "upArrow", "up1");
    this.up1.on('pointerdown', ()=>this.changemLs("up1"));
    this.down1=new arrowButton(this, 60, 230, "downArrow", "down1");
    this.down1.on('pointerdown', ()=>this.changemLs("down1"));
    this.up2=new arrowButton(this, 200, 190, "upArrow", "up2");
    this.up2.on('pointerdown', ()=>this.changemLs("up2"));
    this.down2=new arrowButton(this, 200, 230, "downArrow", "down2");
    this.down2.on('pointerdown', ()=>this.changemLs("down2"));
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


  changeButtonTint(button: reactionButton){
    button.setTintFill(0x033dfc);
    console.log("here");
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
    let pdtmols=this.findLR();
    let pdtconc=(pdtmols*0.001)/(this.mLs+this.mLs2);
    this.abs=pdtconc*6120;
    if (this.mLs==0||this.mLs2==0){
      this.abs=0;
    }
    if (this.selectedRxn=="CD"||this.selectedRxn=="EF"){
      this.abs=0;
    }
    this.changeCuvette();
  }

  updateAbs(){
    this.absLabel.text="Absorbance: "+ this.abs.toString().substring(0,4);
  }

  changeCuvette(){
    this.fullCuvette.setAlpha(1.0);
    this.cuvetteOutline.setAlpha(1.0);
    this.emptyCuvette.setAlpha(0.0);
    if (this.abs>0&&this.abs<0.2){
      this.fullCuvette.setTintFill(0xffb5b9);
    }
    if (this.abs>=0.2&&this.abs<0.4){
      this.fullCuvette.setTintFill(0xff9197);
    }
    if (this.abs>=0.4&&this.abs<0.6){
      this.fullCuvette.setTintFill(0xff7077);
    }
    if (this.abs>=0.6&&this.abs<0.8){
      this.fullCuvette.setTintFill(0xff545d);
    }
    if (this.abs>=0.8&&this.abs<1.0){
      this.fullCuvette.setTintFill(0xff2e38);
    }
    if (this.abs>=1.0&&this.abs<1.2){
      this.fullCuvette.setTintFill(0xff2530);
    }
    if (this.abs>=1.2&&this.abs<1.4){
      this.fullCuvette.setTintFill(0xff0512);
    }
    if (this.abs>=1.4&&this.abs<1.6){
      this.fullCuvette.setTintFill(0xe8000c);
    }
  }

  graphPoint(){
    let MFB=this.findMF();
    let x=480+MFB*278;
    let y=185-(this.abs/1.6)*132;

    this.newestDP = new dataPoint(this, x, y, this.abs, MFB); 
    this.newestDP.on('pointerover', ()=>this.updateSPLabel(), this);
    this.newestDP.on('pointeroff', ()=>this.clearSPLabel(), this);
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
      this.mRLabel.text="Latest Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs.toString().substring(0,4));
    }
    if (this.selectedRxn=="CD"){
      this.mRLabel.text="Latest Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs);
    }
    if (this.selectedRxn=="EF"){
      this.mRLabel.text="Latest Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs);
    }
  }

  updateSPLabel(){
    if (this.selectedRxn=="AB"){
      this.sPLabel.text="Selected Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs.toString().substring(0,4));
    }
    if (this.selectedRxn=="CD"){
      this.sPLabel.text="Selected Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs);
    }
    if (this.selectedRxn=="EF"){
      this.sPLabel.text="Selected Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nA: "+(this.abs);
    }
  }

  clearSPLabel(){

    this.sPLabel.text="";
  }
}
