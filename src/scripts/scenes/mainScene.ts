import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import moleculeScene from './molecules';

export default class MainScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private specButton: analysisButton;
  private tempButton: analysisButton;
  private precipButton: analysisButton;
  private MCVLabel: Phaser.GameObjects.Image;
  private LRLabel: Phaser.GameObjects.Image;
  private O2Button: analysisButton;
  private FeButton: analysisButton;
  private MCVshot: Phaser.GameObjects.Image;
  private LRshot: Phaser.GameObjects.Image;
  private blackBox: Phaser.GameObjects.Image;
  private blackBox2: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background=this.add.image(600, 200, "bluebackground");
    this.background.setScale(2.0);

    this.add.text(0, 0, "Main Scene");

    this.MCVLabel=this.add.image(600, 50, "MCVLabel");
    this.MCVLabel.setScale(0.4);
    this.LRLabel=this.add.image(200, 50, "LRLabel");
    this.LRLabel.setScale(0.4);

    this.add.text(25, 100, "Pick a reaction to\nget started:", {fill: '0000000'});
    this.O2Button=new analysisButton(this, 130, 150, "O2Rxn", 0.2);
    this.O2Button.on('pointerdown', this.O2Picked, this);

    this.FeButton=new analysisButton(this, 145, 180, "FeRxn", 0.25);
    this.FeButton.on('pointerdown', this.FePicked, this);

    this.add.text(425, 100, "Pick a method of \nanalysis to begin:", {fill: "#fffffff"});
    this.specButton=new analysisButton(this, 500, 150, "spec", 0.4);
    this.specButton.on('pointerdown', this.specPicked, this);

    this.tempButton=new analysisButton(this, 476, 170, "temp", 0.26);
    this.tempButton.on('pointerdown', this.tempPicked, this);

    this.precipButton=new analysisButton(this, 489, 190, "precip", 0.3);
    this.precipButton.on('pointerdown', this.precipPicked, this);

    this.blackBox=this.add.image(600, 300, "blackBox");
    this.blackBox.setScale(0.36);
    this.MCVshot=this.add.image(600, 300, "MCVshot");
    this.MCVshot.setScale(0.35);
    
    this.blackBox2=this.add.image(200, 300, "blackBox");
    this.blackBox2.setScale(0.36);
    this.LRshot=this.add.image(200, 300, "LRshot");
    this.LRshot.setScale(0.35);

  }

  update(){
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

  O2Picked(){
    this.scene.start('MoleculeScene');
  }

  FePicked(){
    this.scene.start("GramScene");
  }
}
