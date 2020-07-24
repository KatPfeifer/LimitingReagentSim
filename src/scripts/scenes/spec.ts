import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import arrowButton from '../objects/arrowButton';
import { cuvette } from '../objects/cuvette';
import dataPoint from '../objects/dataPoint';
import reactionHighlights from '../objects/reactionHighlights';
import button from '../objects/button';
import productImage from '../objects/productImage';

export default class SpecScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private selectedRxn: string;
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

  constructor() {
    super({ key: 'SpecScene' });
  }

  create() {
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

    this.createArrowButtons();

    this.mixButton=this.add
    .image(250, 170, "mixSolBut")
    .setScale(0.5)
    .setInteractive();
    this.mixButton.on('pointerdown', ()=>this.findAbs(), this);

    this.graphButton=this.add
    .image(360, 170, "graphButton")
    .setScale(0.5)
    .setInteractive();
    this.graphButton.on('pointerdown', ()=>this.graphPoint(), this);
      
    this.createCuvettes();
    this.createmLs();
    

    this.dataList=[];

    this.backButton=new button(this, 750, 375, "backButton", 0.7);
    this.backButton.on('pointerdown', ()=>this.goBack(), this);

    this.mainButton=new button(this, 650, 375, "mainButton", 0.7);
    this.mainButton.on('pointerdown', ()=>this.goToMain(), this);

    this.button1=new button(this, 50, 50, "button1", 0.7);
    this.button1.on('pointerdown', ()=>this.changeCoefficients(), this);
    this.button2=new button(this, 50, 100, "button2", 0.7);
    this.button2.on('pointerdown', ()=>this.changeCoefficients(), this);
    this.button3=new button(this, 50, 150, "button3", 0.7);
    this.button3.on('pointerdown', ()=>this.changeCoefficients(), this);

    this.add.text(180, 120, "[All solutions]=0.001M", {fill: "000000"});
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
  

  update() {
  }

  init(data){
    let ar=data;
    this.selectedRxn=ar[0].toString();
    console.log("in init: "+ this.selectedRxn);
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
    /*
    let pdtmols=this.findLR();
    let pdtconc=(pdtmols*0.001)/(this.mLs+this.mLs2);
    this.abs=pdtconc*6120;
    if (this.mLs==0||this.mLs2==0){
      this.abs=0;
    }
    */
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
    this.newestDP.on('pointerout', ()=>this.clearSPLabel(), this);
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
  
  clearGraph(){
    for (let i=this.dataList.length-1; i>-1; i--){
      this.dataList[i].setAlpha(0.0);
    }
  }

  changeCoefficients(){
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
