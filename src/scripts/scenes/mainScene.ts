import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import moleculeScene from './molecules';
import button from '../objects/button';

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
  private ABbutton: button;
  private CDbutton: button;
  private EFbutton: button;

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

    this.ABbutton=new button(this, 500, 100, "ABbutton", 0.3);
    this.ABbutton.on('pointerdown', ()=>this.abPicked(), this);
    this.CDbutton=new button(this, 500, 150, "CDbutton", 0.28);
    this.CDbutton.on('pointerdown', ()=>this.cdPicked(), this);
    this.EFbutton=new button(this, 500, 200, "EFbutton", 0.31);
    this.EFbutton.on('pointerdown', ()=>this.efPicked(), this);

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

  abPicked(){
    this.scene.start('abScene');
  }

  cdPicked(){
    this.scene.start('cdScene');
  }

  efPicked(){
    this.scene.start('efScene');
  }

  O2Picked(){
    this.scene.start('MoleculeScene');
  }

  FePicked(){
    this.scene.start("GramScene");
  }
}
