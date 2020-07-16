import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import arrowButton from '../objects/arrowButton';
import { cuvette } from '../objects/cuvette';

export default class SpecScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private ABRxn: any;
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

  constructor() {
    super({ key: 'SpecScene' });
  }

  create() {
    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);

    this.abs=0;

    this.mLs=0;
    this.mLsLabel = this.add.bitmapText(60, 200, "pixelFont");
    this.mLsLabel.fontSize=30;
    this.mLsLabel.text=this.mLs.toString();

    this.mLs2=0;
    this.mLsLabel2=this.add.bitmapText(200, 200, "pixelFont");
    this.mLsLabel2.fontSize=30;
    this.mLsLabel2.text=this.mLs2.toString();

    this.absLabel=this.add.bitmapText(300, 350, "pixelFont");
    this.absLabel.fontSize=30;
    this.absLabel.text=this.abs.toString();

    this.add.text(50, 50, "Pick a \nreaction:", {fill: "#fffffff"});
    this.ABRxn=new reactionButton(this, 100, 100, "A+B", 0.2);
    this.ABRxn.on('pointerdown', this.ABPicked);

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
    console.log(this.selectedRxn + "was picked");
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
    console.log("here");
    let pdtmols=this.findLR();
    let pdtconc=(pdtmols*0.001)/(this.mLs+this.mLs2);
    this.abs=pdtconc*6120;
    console.log(this.abs);
    this.changeCuvette();
  }

  updateAbs(){
    this.absLabel.text=this.abs.toString().substring(0,4);
  }

  changeCuvette(){
    this.fullCuvette.setAlpha(1.0);
    this.cuvetteOutline.setAlpha(1.0);
    this.emptyCuvette.setAlpha(0.0);
    if (this.abs<0.2){
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
      this.fullCuvette.setTintFill(0xff1c27);
    }
    if (this.abs>=1.2&&this.abs<1.4){
      this.fullCuvette.setTintFill(0xff0512);
    }
    if (this.abs>=1.4&&this.abs<1.6){
      this.fullCuvette.setTintFill(0xe8000c);
    }
  }
}
