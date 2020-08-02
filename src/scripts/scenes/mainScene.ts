import ExampleObject from '../objects/exampleObject';
import reactionButton from '../objects/reactionButton';
import analysisButton from '../objects/analysisButton';
import moleculeScene from './molecules';
import button from '../objects/button';
import buttonOutline from '../objects/buttonOutline';

export default class MainScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private MCVLabel: Phaser.GameObjects.Image;
  private LRLabel: Phaser.GameObjects.Image;
  private O2Button: button;
  private FeButton: button;
  private MCVshot: Phaser.GameObjects.Image;
  private LRshot: Phaser.GameObjects.Image;
  private blackBox: Phaser.GameObjects.Image;
  private blackBox2: Phaser.GameObjects.Image;
  private ABbutton: button;
  private CDbutton: button;
  private EFbutton: button;
  private ABoutline: buttonOutline;
  private CDoutline: buttonOutline;
  private EFoutline: buttonOutline;
  private O2outline: buttonOutline;
  private Feoutline: buttonOutline;
  private PYButton: button;
  private IDLRButton: button;
  private RLButton: button;
  private PFButton: button;
  private IDLRBO: buttonOutline; //=ID Limiting Reactant Button Outline
  private PFBO: buttonOutline;
  private RLBO: buttonOutline;
  private PYBO: buttonOutline;
  private exampleButton: button;
  private EBO: buttonOutline;


  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background=this.add.image(600, 200, "bluebackground");
    this.background.setScale(2.0);

    this.add.text(0, 0, "Main Scene");

    this.MCVLabel=this.add.image(600, 20, "MCVLabel");
    this.MCVLabel.setScale(0.4);
    this.LRLabel=this.add.image(200, 20, "LRLabel");
    this.LRLabel.setScale(0.4);

    this.add.text(70, 40, "Examples", {fill: "000000", fontFamily: "Calibri", fontStyle: "bold"});
    this.add.text(215, 40, "Practice Problems", {fill: "000000", fontFamily: "Calibri", fontStyle: "bold"});
    this.add.text(450, 40, "Pick a reaction\n to get started", {fill: "000000", fontFamily: "Calibri", fontStyle: "bold"});
    this.add.text(580, 110, "Or try this example", {fill: "000000", fontFamily: "Calibri", fontStyle: "bold"});

    this.O2Button=new button(this, 100, 100, "O2H2button", 0.3);
    this.O2Button.on('pointerdown', ()=>this.O2Picked(), this);

    this.O2outline=new buttonOutline(this, 100, 100, "O2H2button", 0.3, 0x02633c);
    this.O2Button.on('pointerover', ()=>this.O2outline.enterHoverState(), this);
    this.O2Button.on('pointerout', ()=>this.O2outline.exitHoverState("word"), this);

    this.FeButton=new button(this, 100, 150, "Fe2O3Cbutton", 0.4);
    this.FeButton.on('pointerdown', ()=>this.FePicked(), this);

    this.Feoutline= new buttonOutline(this, 100, 150, "Fe2O3Cbutton", 0.4, 0x02633c);
    this.FeButton.on('pointerover', ()=>this.Feoutline.enterHoverState(), this);
    this.FeButton.on('pointerout', ()=>this.Feoutline.exitHoverState("word"), this);

    this.ABbutton=new button(this, 500, 100, "ABbutton", 0.3);
    this.ABbutton.on('pointerdown', ()=>this.abPicked(), this);
    this.CDbutton=new button(this, 500, 150, "CDbutton", 0.28);
    this.CDbutton.on('pointerdown', ()=>this.cdPicked(), this);
    this.EFbutton=new button(this, 500, 200, "EFbutton", 0.31);
    this.EFbutton.on('pointerdown', ()=>this.efPicked(), this);

    this.ABoutline=new buttonOutline(this, 500, 100, "ABbutton", 0.3, 0x3d0a57);
    this.ABbutton.on('pointerover', ()=>this.ABoutline.enterHoverState(), this);
    this.ABbutton.on('pointerout', ()=>this.ABoutline.exitHoverState("word"), this);
    this.CDoutline=new buttonOutline(this, 500, 150, "CDbutton", 0.28, 0x3d0a57);
    this.CDbutton.on('pointerover', ()=>this.CDoutline.enterHoverState(), this);
    this.CDbutton.on('pointerout', ()=>this.CDoutline.exitHoverState("word"), this);
    this.EFoutline=new buttonOutline(this, 500, 200, "EFbutton", 0.31, 0x3d0a57);
    this.EFbutton.on('pointerover', ()=>this.EFoutline.enterHoverState(), this);
    this.EFbutton.on('pointerout', ()=>this.EFoutline.exitHoverState("word"), this);

    this.exampleButton = new button(this, 650, 150, "exampleButton", 0.7);
    this.exampleButton.on('pointerdown', ()=>this.goToExample(), this);
    this.EBO= new buttonOutline(this, 650, 150, "exampleButton", 0.7, 420061);
    this.exampleButton.on('pointerover', ()=>this.EBO.enterHoverState(), this);
    this.exampleButton.on('pointerout', ()=>this.EBO.exitHoverState("word"), this);


    this.IDLRButton = new button(this, 275, 80, "IDLR", 0.7);
    this.PFButton = new button(this, 275, 120, "PdtFormed", 0.7);
    this.RLButton = new button(this, 275, 160, "ReactantLeft", 0.7);
    this.PYButton = new button(this, 275, 200, "PY", 0.7);

    this.IDLRButton.on('pointerdown', ()=>this.goToIDLR(), this);
    this.PFButton.on('pointerdown', ()=>this.goToPF(), this);
    this.RLButton.on('pointerdown', ()=>this.goToRL(), this);
    this.PYButton.on('pointerdown', ()=>this.goToPY(), this);

    this.IDLRBO = new buttonOutline(this, 275, 80, "IDLR", 0.7, 0x6e1a01);
    this.IDLRButton.on('pointerover', ()=>this.IDLRBO.enterHoverState(), this);
    this.IDLRButton.on('pointerout', ()=>this.IDLRBO.exitHoverState("word"), this);

    this.PFBO = new buttonOutline(this, 275, 120, "PdtFormed", 0.7, 0x6e1a01);
    this.PFButton.on('pointerover', ()=>this.PFBO.enterHoverState(), this);
    this.PFButton.on('pointerout', ()=>this.PFBO.exitHoverState("word"), this);

    this.RLBO = new buttonOutline(this, 275, 160, "ReactantLeft", 0.7, 0x6e1a01);
    this.RLButton.on('pointerover', ()=>this.RLBO.enterHoverState(), this);
    this.RLButton.on('pointerout', ()=>this.RLBO.exitHoverState("word"), this);

    this.PYBO= new buttonOutline(this, 275, 200, "PY", 0.7, 0x6e1a01);
    this.PYButton.on('pointerover', ()=>this.PYBO.enterHoverState(), this);
    this.PYButton.on('pointerout', ()=>this.PYBO.exitHoverState("word"), this);

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
    this.scene.start("FeMolecScene");
  }

  goToPF(){
    this.scene.start("pdtFormedScene");
  }

  goToIDLR(){
    this.scene.start("pickLRScene");
  }

  goToRL(){
    this.scene.start("reactantLeftScene");
  }

  goToPY(){
    this.scene.start("percentYieldScene");
  }

  goToExample(){
    this.scene.start("ExampleScene");
  }

}
