import arrowButton from "../objects/arrowButton";
import compoundLabel from "../objects/compoundLabel";
import button from "../objects/button";

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
    private O2: Phaser.GameObjects.Image;
    private H2: Phaser.GameObjects.Image;
    private H2O: Phaser.GameObjects.Image;
    private O2Left: Phaser.GameObjects.Image;
    private H2Left: Phaser.GameObjects.Image;
    private backButton: button;

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

        this.O2g=0;
        this.H2g=0;
        this.H2Og=0;
        this.O2gLeft=0;
        this.H2gLeft=0;

        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goToMain(), this);


        this.createArrowButtons();
        this.createLabels();
        this.updateLabels();
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
        this.O2Label=new compoundLabel(this, 75, 290, this.O2g.toString());
        this.H2Label=new compoundLabel(this, 175, 290, this.H2g.toString());
        this.H2OLabel=new compoundLabel(this, 430, 290, this.H2Og.toString());
        this.O2LeftLabel=new compoundLabel(this, 570, 290, this.O2gLeft.toString());
        this.H2LeftLabel=new compoundLabel(this, 710, 290, this.H2gLeft.toString());
    }


    update(){

    }

    changeGrams(name: string){
        if(name=="up1"&&this.O2g<20){
            this.O2g+=1;
        }
        if(name=="down1"&&this.O2g>0){
            this.O2g-=1;
        }
        if(name=="up2"&&this.H2g<20){
            this.H2g+=1;
        }
        if(name=="down2"&&this.H2g>0){
            this.H2g-=1;
        }

        this.findPdts();
        this.updateLabels();
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
        this.O2Label.text=this.O2g.toString().substring(0,4);
        this.H2Label.text=this.H2g.toString().substring(0,4);
        this.H2OLabel.text=this.H2Og.toString().substring(0,4);
        this.O2LeftLabel.text=this.O2gLeft.toString().substring(0,4);
        this.H2LeftLabel.text=this.H2gLeft.toString().substring(0,4);
    }

    goToMain(){
        this.scene.start('MainScene');
    }
}