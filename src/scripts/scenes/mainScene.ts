import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private ABRxn: any;
  private ABRxnHighlight: any;
  private background: any;
  private selectedRxn: any;
  private specButton: any;
  private tempButton: any;
  private precipButton: any;
  private mLsLabel: any;

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

    this.ABRxnHighlight=this.add
        .image(100, 100, "A+B")
        .setScale(0.2)
        .setTintFill(0xc4254d)
        .setAlpha(0.0);

    this.add.text(200, 50, "Pick a method \nof analysis:", {fill: "#fffffff"});
    this.specButton=new analysisButton(this, 270, 100, "spec", 0.4);
    this.specButton.on('pointerdown', this.specPicked, this);

    this.tempButton=new analysisButton(this, 245, 120, "temp", 0.26);
    this.tempButton.on('pointerdown', this.tempPicked, this);

    this.precipButton=new analysisButton(this, 258, 140, "precip", 0.3);
    this.precipButton.on('pointerdown', this.precipPicked, this);

  }

  update() {
      if (this.selectedRxn == "A+B"){
          this.ABRxnHighlight.setAlpha(1.0);
      }
  }

  ABPicked(){
    this.selectedRxn="A+B";
    console.log(this.selectedRxn=="A+B");
    //this.ABRxnHighlight.setVisible(true);
    console.log("AB was picked");
  }

  specPicked(){
      this.scene.start('SpecScene');
  }

  tempPicked(){
      this.scene.start('TempScene');
  }

  precipPicked(){
      this.scene.start('PrecipScene');
  }
}
