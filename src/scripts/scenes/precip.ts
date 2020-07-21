import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import reactionHighlights from '../objects/reactionHighlights';
import arrowButton from '../objects/arrowButton';
import dataPoint from '../objects/dataPoint';
import productImage from '../objects/productImage';
import { vial } from '../objects/vial';
import button from '../objects/button';

export default class PrecipScene extends Phaser.Scene {
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
  private background: Phaser.GameObjects.Image;
  private selectedRxn: string;
  private specButton: analysisButton;
  private tempButton: analysisButton;
  private precipButton: analysisButton;
  private mLsLabel: any; //figure out type of labels
  private mLsLabel2: any;
  private mLs: any;
  private mLs2: any;
  private up1: arrowButton;
  private up2: arrowButton;
  private down1: arrowButton;
  private down2: arrowButton;
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

  constructor() {
    super({ key: 'PrecipScene' });
  }

  create() {
    this.mass=0.0001;
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
   this.backButton.on('pointerdown', ()=>this.goToMain(), this);
   this.ABPdtImage=new productImage(this, 400, 200, "ABPdt", 0.4);
   this.CDPdtImage=new productImage(this, 400, 200, "CDPdt", 0.5);
   this.EFPdtImage=new productImage(this, 400, 200, "EFPdt", 0.8);
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
    this.precipGraphAB=this.add.image(600, 120, "precipGraphAB");
    this.precipGraphAB.setScale(0.7);
    this.precipGraphCD=this.add.image(600, 120, "tempGraphCD");
    this.precipGraphCD.setScale(0.7);
    this.precipGraphCD.setAlpha(0.0);
    this.precipGraphEF=this.add.image(600, 120, "tempGraphCD");
    this.precipGraphEF.setScale(0.7);
    this.precipGraphEF.setAlpha(0.0);
  }

  update() {
  }

  doDrag(pointer){
    this.fullVial.x=pointer.x;
    this.fullVial.y=pointer.y;
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


  /*changeButtonTint(button: reactionButton){
    button.setTintFill(0x033dfc);
    console.log("here");
  }
  */

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
    if (this.selectedRxn=="CD"){
      let mmol=this.findLR()*10;
      this.mass=(mmol*452.8)/1000;
      this.emptyVial.setAlpha(0.0);
      this.fullVial.setAlpha(1.0);
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
    let MFB=this.findMF();
    let x=486+MFB*264;
    let y=174-108*(this.mass/4.6);

    this.newestDP = new dataPoint(this, x, y, this.mass, MFB); 
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
      this.mRLabel.text="Latest Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.mass.toString().substring(0,4));
    }
    if (this.selectedRxn=="CD"){
      this.mRLabel.text="Latest Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.mass.toString().substring(0,4));
    }
    if (this.selectedRxn=="EF"){
      this.mRLabel.text="Latest Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.mass.toString().substring(0,4));
    }
  }

  updateSPLabel(){
    if (this.selectedRxn=="AB"){
      this.sPLabel.text="Selected Data Point: \nX(A): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(B): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.mass.toString().substring(0,4));
    }
    if (this.selectedRxn=="CD"){
      this.sPLabel.text="Selected Data Point: \nX(C): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(D): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.mass.toString().substring(0,4));
    }
    if (this.selectedRxn=="EF"){
      this.sPLabel.text="Selected Data Point: \nX(E): "+ (1-this.findMF()).toString().substring(0,4)+"\nX(F): "+(this.findMF()).toString().substring(0,4)+"\nTC: "+(this.mass.toString().substring(0,4));
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

  goToMain(){
    this.scene.start('MainScene');
  }
}
