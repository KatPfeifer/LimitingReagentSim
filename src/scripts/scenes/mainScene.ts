import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private ABRxn: any;
  private background: any;
  private selectedRxn: any;
  private specButton: any;
  private tempButton: any;
  private precipButton: any;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);

    this.add.text(0, 0, "Main Scene");

    this.add.text(50, 50, "Pick a \nreaction:", {fill: "#fffffff"});
    this.ABRxn=new reactionButton(this, 100, 100, "A+B", 0.2);
    this.ABRxn.on('pointerdown', this.ABPicked);

    this.add.text(200, 50, "Pick a method \nof analysis:", {fill: "#fffffff"});
    this.specButton=new analysisButton(this, 270, 100, "spec", 0.4);
    this.specButton.on('pointerdown', this.specPicked, this);

    this.tempButton=new analysisButton(this, 245, 120, "temp", 0.26);
    this.tempButton.on('pointerdown', this.tempPicked, this);

    this.precipButton=new analysisButton(this, 258, 140, "precip", 0.3);


    

    
    //this.exampleObject = new ExampleObject(this, 0, 0);
  }

  update() {
  }

  ABPicked(){
    this.selectedRxn="AB";
    console.log("AB was picked");
  }

  specPicked(){
      this.scene.start('SpecScene');
  }

  tempPicked(){
      this.scene.start('TempScene');
  }


  changeButtonTint(button: reactionButton){
    button.setTintFill(0x033dfc);
    console.log("here");
  }
}
