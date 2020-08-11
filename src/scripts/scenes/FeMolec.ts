import arrowButton from "../objects/arrowButton";
import compoundLabel from "../objects/compoundLabel";
import button from "../objects/button";
import buttonOutline from "../objects/buttonOutline";

export default class FeMolec extends Phaser.Scene{
    private Fe2O3: number;
    private C: number;
    private Fe: number;
    private CO2: number;
    private Fe2O3Left: number;
    private CLeft: number;
    private Fe2O3pic: Phaser.GameObjects.Image;
    private Cpic: Phaser.GameObjects.Image;
    private Fepic: Phaser.GameObjects.Image;
    private CO2pic: Phaser.GameObjects.Image;
    private Fe2O3leftPic: Phaser.GameObjects.Image;
    private CLeftPic: Phaser.GameObjects.Image;
    private FeRxn: Phaser.GameObjects.Image;
    private Fe2O3Label: compoundLabel;
    private CLabel: compoundLabel;
    private FeLabel: compoundLabel;
    private CO2Label: compoundLabel;
    private Fe2O3LeftLabel: compoundLabel;
    private CLeftLabel: compoundLabel;
    private up1: arrowButton;
    private up2: arrowButton;
    private down1: arrowButton;
    private down2: arrowButton;
    private Rbox: Phaser.GameObjects.Image;
    private Pbox: Phaser.GameObjects.Image;
    private blueArrow: Phaser.GameObjects.Image;
    private backButton: button;
    private gramButton: button;
    private moleculeButton: button;
    private selectedVisual: string;
    private gBOutline: buttonOutline;
    private mBOutline: buttonOutline;
    private Fe2O3stack: Phaser.GameObjects.Image;
    private Cstack: Phaser.GameObjects.Image;
    private Festack: Phaser.GameObjects.Image;
    private CO2stack: Phaser.GameObjects.Image;
    private Fe2O3leftStack: Phaser.GameObjects.Image;
    private CleftStack: Phaser.GameObjects.Image;
    private products: Phaser.GameObjects.Image;
    private reactants: Phaser.GameObjects.Image;
    private leftovers: Phaser.GameObjects.Image;

    constructor(){
        super({ key: 'FeMolecScene'});
    }

    create(){
        this.Rbox=this.add.image(150, 170, "rBox");
        this.Rbox.setScale(0.3);
        this.Pbox=this.add.image(570, 170, "pBox");
        this.Pbox.setScale(0.3);

        console.log(Math.floor(5/2));

        this.Fe2O3=0;
        this.C=0;
        this.Fe=0;
        this.CO2=0;
        this.Fe2O3Left=0;
        this.CLeft=0;
        this.selectedVisual="moleculeButton";

        this.createArrowButtons();
        this.createLabels();
        this.createPics();
        

        this.blueArrow=this.add.image(320, 180, "blueArrow");
        this.blueArrow.setScale(0.25);

        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goToMain(), this);

        this.gramButton=new button(this, 50, 375, "gramButton", 0.7);
        this.gBOutline= new buttonOutline(this, 50, 375, "gramButton", 0.7,0x3d0a57);
        this.gramButton.on('pointerover', ()=>this.gBOutline.enterHoverState(), this);
        this.gramButton.on('pointerout', ()=>this.gBOutline.exitHoverState(this.selectedVisual));
        this.gramButton.on('pointerdown', ()=>this.goToGrams(), this);
        this.moleculeButton= new button(this, 150, 375, "moleculeButton", 0.7);
        this.mBOutline=new buttonOutline(this, 150, 375, "moleculeButton", 0.7,0x3d0a57);
        this.mBOutline.setAlpha(0.3);
        this.moleculeButton.on('pointerover', ()=>this.mBOutline.enterHoverState(), this);
        this.moleculeButton.on('pointerout', ()=>this.mBOutline.exitHoverState(this.selectedVisual), this);

        this.reactants=this.add.image(130, 340, "reactants");
        this.reactants.setScale(0.3);
        this.products=this.add.image(480, 340, "products");
        this.products.setScale(0.3);
        this.leftovers=this.add.image(680, 340, "leftovers");
        this.leftovers.setScale(0.3);
        
        this.createStacks();
    }

    createArrowButtons(){
        this.up1=new arrowButton(this, 80, 280, "upArrow", "up1");
        this.up1.on('pointerdown', ()=>this.changeMolecs("up1"));
        this.down1=new arrowButton(this, 80, 320, "downArrow", "down1");
        this.down1.on('pointerdown', ()=>this.changeMolecs("down1"));
        this.up2=new arrowButton(this, 180, 280, "upArrow", "up2");
        this.up2.on('pointerdown', ()=>this.changeMolecs("up2"));
        this.down2=new arrowButton(this, 180, 320, "downArrow", "down2");
        this.down2.on('pointerdown', ()=>this.changeMolecs("down2"));
      }

      createLabels(){
          this.Fe2O3Label= new compoundLabel(this, 75, 290, this.Fe2O3.toString().substring(0,3));
          this.CLabel=new compoundLabel(this, 175, 290, this.C.toString().substring(0,3));
          this.FeLabel= new compoundLabel(this, 415, 290, this.Fe.toString().substring(0,3));
          this.CO2Label=new compoundLabel(this, 500, 290, this.CO2.toString().substring(0,3));
          this.Fe2O3LeftLabel= new compoundLabel(this, 600, 290, this.Fe2O3Left.toString().substring(0,3));
          this.CLeftLabel=new compoundLabel(this, 700, 290, this.CLeft.toString().substring(0,3));
      }

      createStacks(){
          this.Fe2O3stack=this.add.image(100, 170, "Fe2O3stack");
          this.Fe2O3stack.setScale(0.19);
          this.Cstack=this.add.image(200, 170, "Cstack");
          this.Cstack.setScale(0.19);
          this.Festack=this.add.image(450, 172, "Festack");
          this.Festack.setScale(0.16);
          this.CO2stack=this.add.image(535, 170, "CO2stack");
          this.CO2stack.setScale(0.19);
          this.Fe2O3leftStack=this.add.image(640, 170, "Fe2O3stack");
          this.Fe2O3leftStack.setScale(0.19);
          this.CleftStack=this.add.image(720, 170, "Cstack");
          this.CleftStack.setScale(0.19);

          this.updateStacks();
      }

      createPics(){
        this.FeRxn=this.add.image(250, 40, "FeRxn");
        this.FeRxn.setScale(0.8);

        this.Fe2O3pic=this.add.image(125, 300, "Fe2O3");
        this.Fe2O3pic.setScale(0.1);
        this.Fe2O3pic.setTintFill(0xff0040);

        this.Fe2O3leftPic=this.add.image(645, 300, "Fe2O3");
        this.Fe2O3leftPic.setScale(0.1);
        this.Fe2O3leftPic.setTintFill(0x00c932);

        this.Cpic=this.add.image(210, 300, "C");
        this.Cpic.setScale(0.06);
        this.Cpic.setTintFill(0xff0040);

        this.CLeftPic=this.add.image(725, 300, "C");
        this.CLeftPic.setScale(0.06);
        this.CLeftPic.setTintFill(0x00c932);

        this.Fepic=this.add.image(450, 300, "Fe");
        this.Fepic.setScale(0.05);
        this.Fepic.setTintFill(0x00b1ff);

        this.CO2pic=this.add.image(540, 300, "CO2");
        this.CO2pic.setScale(0.08);
        this.CO2pic.setTintFill(0x00b1ff);
    }

   

    changeMolecs(name: string){
        if(name=="up1"&&this.Fe2O3<10){
            this.Fe2O3+=1;
        }
        if(name=="down1"&&this.Fe2O3>0){
            this.Fe2O3-=1;
        }
        if(name=="up2"&&this.C<10){
            this.C+=1;
        }
        if(name=="down2"&&this.C>0){
            this.C-=1;
        }

        this.findPdts();
        this.updateLabels();
        this.updateStacks();
    }

    findPdts(){
        if (Math.floor(this.Fe2O3/2)<=Math.floor(this.C/3)){
            let num=Math.floor(this.Fe2O3/2);
            this.Fe2O3Left=this.Fe2O3-num*2;
            this.Fe=4*num;
            this.CO2=3*num;
            this.CLeft=this.C-3*num;
        }
        if (Math.floor(this.C/3)<Math.floor(this.Fe2O3/2)){
            let num=Math.floor(this.C/3);
            this.CLeft=this.C-num*3;
            this.Fe=4*num;
            this.CO2=3*num;
            this.Fe2O3Left=this.Fe2O3-num*2;
        }
    }

    updateStacks(){
        this.Fe2O3stack.setCrop(0, this.Fe2O3stack.height-((this.Fe2O3stack.height)*(this.Fe2O3/10)), this.Fe2O3stack.width, this.Fe2O3stack.height);
        this.Cstack.setCrop(0, this.Cstack.height-(this.Cstack.height*(this.C/10)), this.Cstack.width, this.Cstack.height);
        this.Festack.setCrop(0, this.Festack.height-(this.Festack.height*(this.Fe/12)), this.Festack.width, this.Festack.height);
        this.CO2stack.setCrop(0, this.CO2stack.height-(this.CO2stack.height*(this.CO2/10)), this.CO2stack.width, this.CO2stack.height);
        this.Fe2O3leftStack.setCrop(0, this.Fe2O3leftStack.height-(this.Fe2O3leftStack.height*(this.Fe2O3Left/10)), this.Fe2O3leftStack.width, this.Fe2O3leftStack.height);
        this.CleftStack.setCrop(0, this.CleftStack.height-(this.CleftStack.height*(this.CLeft/10)), this.CleftStack.width, this.CleftStack.height);
    }

    updateLabels(){
        this.Fe2O3Label.text=this.Fe2O3.toString();
        this.CLabel.text=this.C.toString();
        this.FeLabel.text=this.Fe.toString();
        this.CO2Label.text=this.CO2.toString();
        this.Fe2O3LeftLabel.text=this.Fe2O3Left.toString();
        this.CLeftLabel.text=this.CLeft.toString();

    }

    goToMain(){
        this.scene.start("MainScene");
    }

    goToGrams(){
        this.scene.start("GramScene");
    }
}