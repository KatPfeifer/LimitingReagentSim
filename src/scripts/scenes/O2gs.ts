import arrowButton from "../objects/arrowButton";
import compoundLabel from "../objects/compoundLabel";
import button from "../objects/button";
import buttonOutline from "../objects/buttonOutline";

export default class O2gs extends Phaser.Scene {
    private O2g: number;
    private H2g: number;
    private H2Og: number;
    private O2gLeft: number;
    private H2gLeft: number;
    private Rbox: Phaser.GameObjects.Image;
    private Pbox: Phaser.GameObjects.Image;
    private up1: arrowButton;
    private down1: arrowButton;
    private up2: arrowButton;
    private down2: arrowButton;
    private blueArrow: Phaser.GameObjects.Image;
    private O2Label: compoundLabel;
    private H2Label: compoundLabel;
    private H2OLabel: compoundLabel;
    private O2LeftLabel: compoundLabel;
    private H2LeftLabel: compoundLabel;
    private rxn: Phaser.GameObjects.Image;
    private O2box: Phaser.GameObjects.Image;
    private H2box: Phaser.GameObjects.Image;
    private H2Obox: Phaser.GameObjects.Image;
    private O2LeftBox: Phaser.GameObjects.Image;
    private H2LeftBox: Phaser.GameObjects.Image;
    private backButton: button;
    private O2: Phaser.GameObjects.Image;
    private H2: Phaser.GameObjects.Image;
    private H2O: Phaser.GameObjects.Image;
    private O2Left: Phaser.GameObjects.Image;
    private H2Left: Phaser.GameObjects.Image;
    private gramButton: button;
    private moleculeButton: button;
    private selectedVisual: string;
    private gBOutline: buttonOutline;
    private mBOutline: buttonOutline;

    constructor(){
        super({ key: 'O2gsScene'});
    }

    create(){
        this.Rbox=this.add.image(150, 170, "rBox");
        this.Rbox.setScale(0.3);
        this.Pbox=this.add.image(570, 170, "pBox");
        this.Pbox.setScale(0.3);
        this.blueArrow=this.add.image(320, 180, "blueArrow");
        this.blueArrow.setScale(0.25);
        this.rxn=this.add.image(180, 40, "O2Rxn");
        this.rxn.setScale(0.3);

        this.O2g=0.001;
        this.H2g=0.001;
        this.H2Og=0.001;
        this.O2gLeft=0.001;
        this.H2gLeft=0.001;
        this.selectedVisual="gramButton";

        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goToMain(), this);

        this.O2box=this.add.image(80, 183, "compoundBox");
        this.O2box.setScale(0.3);
        this.H2box=this.add.image(180, 183, "compoundBox");
        this.H2box.setScale(0.3);
        this.H2Obox=this.add.image(450, 183, "compoundBox");
        this.H2Obox.setScale(0.3);
        this.O2LeftBox=this.add.image(580, 183, "compoundBox");
        this.O2LeftBox.setScale(0.3);
        this.H2LeftBox=this.add.image(710, 183, "compoundBox");
        this.H2LeftBox.setScale(0.3);

        this.gramButton=new button(this, 50, 375, "gramButton", 0.7);
        this.gBOutline= new buttonOutline(this, 50, 375, "gramButton", 0.7);
        this.gBOutline.setAlpha(0.3);
        this.gramButton.on('pointerover', ()=>this.gBOutline.enterHoverState(), this);
        this.gramButton.on('pointerout', ()=>this.gBOutline.exitHoverState(this.selectedVisual));
        this.moleculeButton= new button(this, 150, 375, "moleculeButton", 0.7);
        this.mBOutline=new buttonOutline(this, 150, 375, "moleculeButton", 0.7);
        this.moleculeButton.on('pointerover', ()=>this.mBOutline.enterHoverState(), this);
        this.moleculeButton.on('pointerout', ()=>this.mBOutline.exitHoverState(this.selectedVisual), this);
        this.moleculeButton.on('pointerdown', ()=>this.goToMolecules(), this);

        this.createArrowButtons();
        this.createLabels();
        this.updateLabels();
        this.createPics();
        this.updateBoxHeights();
    }

    createPics(){
        this.O2=this.add.image(115, 300, "O2");
        this.O2.setScale(0.1);
        this.O2.setTintFill(0xff0040);
        this.H2=this.add.image(215, 300, "H2");
        this.H2.setScale(0.1);
        this.H2.setTintFill(0xff0040);
        this.H2O=this.add.image(480, 300, "H2O");
        this.H2O.setScale(0.1);
        this.H2O.setTintFill(0xff0040);
        this.O2Left=this.add.image(615, 300, "O2");
        this.O2Left.setScale(0.1);
        this.O2Left.setTintFill(0xff0040);
        this.H2Left=this.add.image(755, 300, "H2");
        this.H2Left.setScale(0.1);
        this.H2Left.setTintFill(0xff0040);
    }

    createArrowButtons(){
        this.up1=new arrowButton(this, 80, 280, "upArrow", "up1");
        this.up1.on('pointerdown', ()=>this.changeGrams("up1"));
        this.down1=new arrowButton(this, 80, 320, "downArrow", "down1");
        this.down1.on('pointerdown', ()=>this.changeGrams("down1"));
        this.up2=new arrowButton(this, 180, 280, "upArrow", "up2");
        this.up2.on('pointerdown', ()=>this.changeGrams("up2"));
        this.down2=new arrowButton(this, 180, 320, "downArrow", "down2");
        this.down2.on('pointerdown', ()=>this.changeGrams("down2"));
    }

    createLabels(){
        this.O2Label=new compoundLabel(this, 65, 290, this.O2g.toString());
        this.H2Label=new compoundLabel(this, 165, 290, this.H2g.toString());
        this.H2OLabel=new compoundLabel(this, 420, 290, this.H2Og.toString());
        this.O2LeftLabel=new compoundLabel(this, 560, 290, this.O2gLeft.toString());
        this.H2LeftLabel=new compoundLabel(this, 700, 290, this.H2gLeft.toString());
    }


    update(){

    }

    changeGrams(name: string){
        if(name=="up1"&&this.O2g<20){
            this.O2g+=0.5;
        }
        if(name=="down1"&&this.O2g>0){
            this.O2g-=0.5;
        }
        if(name=="up2"&&this.H2g<20){
            this.H2g+=0.5;
        }
        if(name=="down2"&&this.H2g>0){
            this.H2g-=0.5;
        }

        this.findPdts();
        this.updateLabels();
        this.updateBoxHeights();
    }

    findPdts(){
        //18.02 = MW of water
        //31.998 = MW of O2
        //2.02 = MW of H2
        let O= (this.O2g*2*18.02)/(31.998);
        let H=(this.H2g*18.02)/(2.02);

        if (O<=H){
            this.H2Og=O;
            this.O2gLeft=0;
            this.H2gLeft=this.H2g-((this.O2g*2*2.02)/(31.998));
        }
        if (H<O){
            this.H2Og=H;
            this.H2gLeft=0;
            this.O2gLeft=this.O2g-((this.H2g*31.998)/(2.02*2));
        }
    }

    updateLabels(){
        this.O2Label.text=this.O2g.toFixed(1);
        this.H2Label.text=this.H2g.toFixed(1);
        this.H2OLabel.text=this.H2Og.toFixed(1);
        this.O2LeftLabel.text=this.O2gLeft.toFixed(1);
        this.H2LeftLabel.text=this.H2gLeft.toFixed(1);
    }

    updateBoxHeights(){
        this.O2box.setCrop(0, this.O2box.height*(1-this.O2g/25), this.O2box.width, this.O2box.height);
        this.H2box.setCrop(0, this.H2box.height*(1-this.H2g/25), this.H2box.width, this.H2box.height);
        this.H2Obox.setCrop(0, this.H2Obox.height*(1-this.H2Og/25), this.H2Obox.width, this.H2Obox.height);
        this.O2LeftBox.setCrop(0, this.O2LeftBox.height*(1-this.O2gLeft/25), this.O2LeftBox.width, this.O2LeftBox.height);
        this.H2LeftBox.setCrop(0, this.H2LeftBox.height*(1-this.H2gLeft/25), this.H2LeftBox.width, this.H2LeftBox.height);
    }

    goToMolecules(){
        this.scene.start('MoleculeScene');
    }

    goToMain(){
        this.scene.start('MainScene');
    }
}