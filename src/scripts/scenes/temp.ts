import arrowButton from '../objects/arrowButton';
import dataPoint from '../objects/dataPoint';
import button from '../objects/button';
import buttonOutline from '../objects/buttonOutline';

export default class TempScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;;
  private selectedRxn: string;
  private mLsLabel: any; //figure out type of labels
  private mLsLabel2: any;
  private mLs: number;
  private mLs2: number;
  private up1: arrowButton;
  private down1: arrowButton;
  private mixButton: any;
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
  private Ecoefficient: number;
  private Fcoefficient: number;
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
  private mixOutline: buttonOutline;
  private addOutline: buttonOutline;
  private helpButton: button;
  private helpOutline: buttonOutline;
  private oldDataPoints: any;
  private dot: any;

  constructor() {
    super({ key: 'TempScene' });
  }

  create() {
    this.molarity=0.1;
    this.temp=25.001;
    this.Ecoefficient=4;
    this.Fcoefficient=3;
    this.version=1;
    this.selectedVersion="button1";

    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    this.background2=this.add.image(600, 200, "bluebackground");
    this.background2.setScale(2.0);

    this.mLs=0;
    this.mLsLabel = this.add.bitmapText(195, 55, "calibriFont");
    this.mLsLabel.fontSize=30;
    this.mLsLabel.text=this.mLs.toString()+"";

    this.mLs2=20;
    this.mLsLabel2=this.add.bitmapText(295, 55, "calibriFont");
    this.mLsLabel2.fontSize=30;
    this.mLsLabel2.text=this.mLs2.toString();

    this.mRLabel=this.add.bitmapText(450, 250, "calibriFont");
    this.mRLabel.fontSize=20;
    
    this.sPLabel=this.add.bitmapText(600, 250, "calibriFont");
    this.sPLabel.fontSize=20;

    this.createArrowButtons();
    this.createGraphs();
    this.createmLs();

    this.dataList=[];

    this.helpButton=new button(this, 40, 375, "helpButton", 0.7);
    this.helpButton.on('pointerdown', ()=>this.goToHelp(), this);
    this.helpOutline = new buttonOutline(this, 40, 375, "helpButton", 0.7, 0x4a0101);
    this.helpButton.on('pointerover', ()=>this.helpOutline.enterHoverState(), this);
    this.helpButton.on('pointerout', ()=>this.helpOutline.exitHoverState("word"), this);

    this.mixButton=new button(this, 230, 170, "mixSolBut", 0.55);
    this.mixButton.on('pointerdown', ()=>this.findTemp(), this);
    this.mixOutline = new buttonOutline(this, 230, 170, "mixSolBut", 0.55, 0x184a01);
    this.mixButton.on('pointerover', ()=>this.mixOutline.enterHoverState(), this);
    this.mixButton.on('pointerout', ()=>this.mixOutline.exitHoverState("word"), this);

    this.graphButton= new button(this, 350, 170, "graphButton", 0.55);
    this.graphButton.on('pointerdown', ()=>this.graphPoint(), this);
    this.addOutline = new buttonOutline(this, 350, 170, "graphButton", 0.55, 0x4a0801);
    this.graphButton.on('pointerover', ()=>this.addOutline.enterHoverState(), this);
    this.graphButton.on('pointerout', ()=>this.addOutline.exitHoverState("word"), this);
    
    this.emptyBeaker=this.add.image(120, 230, "emptyBeaker");
    this.emptyBeaker.setScale(0.55);

    this.fullBeaker=this.add.image(120, 230, "fullBeaker");
    this.fullBeaker.setScale(0.55);
    this.fullBeaker.setAlpha(0.0);

    this.thermoHead=this.add.image(300, 310, "thermoHead");
    this.thermoHead.setScale(0.28);

    this.tempLabel=this.add.bitmapText(285, 305, "calibriFont");
    this.tempLabel.fontSize=30;
    this.tempLabel.setTintFill(0x000000);
    this.tempLabel.text=this.temp.toFixed(1)+ " C";
    
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


    this.add.text(180, 120, "[All solutions]=0.1M", {fontFamily: "calibri", fill: "000000"});
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
    this.tempGraphAB=this.add.image(600, 115, "tempGraphAB");
    this.tempGraphAB.setScale(0.65);
    this.tempGraphCD=this.add.image(600, 115, "tempGraphCD");
    this.tempGraphCD.setScale(0.65);
    this.tempGraphEF=this.add.image(600, 115, "tempGraphEF");
    this.tempGraphEF.setScale(0.65);
    this.changeGraphs();
  }

  changeGraphs(){
    console.log(this.selectedRxn);
    if (this.selectedRxn=='AB'){
      this.tempGraphAB.setAlpha(1.0);
      this.tempGraphCD.setAlpha(0.0);
      this.tempGraphEF.setAlpha(0.0);
    }
    if (this.selectedRxn=="CD"){
      this.tempGraphAB.setAlpha(0.0);
      this.tempGraphCD.setAlpha(1.0);
      this.tempGraphEF.setAlpha(0.0);
    }
    if (this.selectedRxn=="EF"){
      this.tempGraphAB.setAlpha(0.0);
      this.tempGraphCD.setAlpha(0.0);
      this.tempGraphEF.setAlpha(1.0);
    }
  }

  update() {

  }

  init(data){
    let ar=data;
    this.selectedRxn=ar[0].toString();
    console.log("in init");
    console.log(this.selectedRxn);
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
    if (this.selectedRxn=="EF"){
    console.log(this.Ecoefficient);
    console.log(this.Fcoefficient);
    let E=(this.mLs*this.molarity*485000)/(1000*this.Ecoefficient*4.19*(this.mLs+this.mLs2));
    let F=(this.mLs2*this.molarity*485000)/(1000*this.Fcoefficient*4.19*(this.mLs+this.mLs2));
      if (E<=F){
        this.tempChange=E;
        console.log("E is "+ E);
      }
      else {
        this.tempChange=F;
        console.log("F is " + F);
      }
    }
    else {
      this.tempChange=0;
    }
    this.temp=25.000001-this.tempChange;
    console.log(this.tempChange);
    this.updateTempLabel();
    this.fullBeaker.setAlpha(1.0);
  }

  graphPoint(){
    let MFB=this.findMF();
    let x=463+MFB*305;
    console.log("x: " + x);
    console.log("temp change: " + this.tempChange);
    let y=175-120*(1-this.tempChange/4);
    console.log("y: "+ y);
    for (let i=0; i<this.dataList.length; i++){
      if (y==this.dataList[i].getY()){
        return;
      }
    }

    this.newestDP = new dataPoint(this, x, y, this.tempChange, MFB, this.selectedRxn, "Temp"); 
    this.dataList.push(this.newestDP);

    this.updateMRLabel();
    this.fullBeaker.setAlpha(0.0);
    this.emptyBeaker.setAlpha(1.0);
    this.temp=25.0001;
    this.tempLabel.text=this.temp.toFixed(1)+ " C";
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
      this.mRLabel.text="Latest Data Point: \nX(A): "+ (1-this.findMF()).toFixed(2)+"\nX(B): "+(this.findMF()).toFixed(2)+"\nTC: -"+(this.tempChange.toFixed(1));
    }
    if (this.selectedRxn=="CD"){
      this.mRLabel.text="Latest Data Point: \nX(C): "+ (1-this.findMF()).toFixed(2)+"\nX(D): "+(this.findMF()).toFixed(2)+"\nTC: -"+(this.tempChange.toFixed(1));
    }
    if (this.selectedRxn=="EF"){
      this.mRLabel.text="Latest Data Point: \nX(E): "+ (1-this.findMF()).toFixed(2)+"\nX(F): "+(this.findMF()).toFixed(2)+"\nTC: -"+(this.tempChange.toFixed(1));
    }
  }

  updateTempLabel(){
    this.tempLabel.text=this.temp.toFixed(1)+ " C";
  }

  clearGraph(){
    console.log("in clear graph")
    for (let i=this.dataList.length-1; i>-1; i--){
      this.dataList[i].setAlpha(0.0);
    }
  }

  changeCoefficients(version: number){
    this.version=version;
    if (this.selectedRxn=="EF"){
      if (this.version==1){
        this.Ecoefficient=4;
        this.Fcoefficient=3;
      }
      if (this.version==2){
        this.Ecoefficient=2;
        this.Fcoefficient=3;
      }
      if (this.version==3){
        this.Ecoefficient=1;
        this.Fcoefficient=4;
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
    this.mLsLabel.text="0";
    this.mLs2=20;
    this.mLsLabel2.text="20";
    this.clearGraph();
    this.mRLabel.text="";
    this.dataList=[];
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
    this.scene.start("tempHelpScene", [this.selectedRxn, this.dataList])
  }

  drawDataPoints(){
    console.log("in draw DP");
    for (let i=0; i<this.oldDataPoints.length; i++ ){
      console.log(this.oldDataPoints[i].getDataValue());
      let newDP=this.oldDataPoints[i];
      let DP = new dataPoint(this, newDP.getX(), newDP.getY(), newDP.getDataValue(), newDP.getMF(), this.selectedRxn, "Temp");

    }
  }
}
