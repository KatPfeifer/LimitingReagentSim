import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';

export default class PrecipScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private ABRxn: reactionButton;
  private background: Phaser.GameObjects.Image;
  private selectedRxn: string;
  private specButton: analysisButton;
  private tempButton: analysisButton;
  private precipButton: analysisButton;

  constructor() {
    super({ key: 'PrecipScene' });
  }

  create() {
    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);

    this.add.text(0, 0, "Precip Scene");

    this.add.text(50, 50, "Pick a \nreaction:", {fill: "#fffffff"});
    this.ABRxn=new reactionButton(this, 100, 100, "A+B", 0.2);
    //Ideal ratio for A+B is 3:2, reaction is measure by temperature
    this.ABRxn.on('pointerdown', this.ABPicked);

    this.add.text(200, 50, "Pick a method \nof analysis:", {fill: "#fffffff"});
    this.specButton=new analysisButton(this, 270, 100, "spec", 0.4);
    this.tempButton=new analysisButton(this, 245, 120, "temp", 0.26);
    this.precipButton=new analysisButton(this, 258, 140, "precip", 0.3);
    
    //this.exampleObject = new ExampleObject(this, 0, 0);
  }

  update() {
  }

  ABPicked(){
    this.selectedRxn="AB";
    console.log("AB was picked");
  }


  changeButtonTint(button: reactionButton){
    button.setTintFill(0x033dfc);
    console.log("here");
  }
}
