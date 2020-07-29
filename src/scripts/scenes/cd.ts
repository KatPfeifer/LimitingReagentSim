import button from "../objects/button";
import buttonOutline from "../objects/buttonOutline";

export default class cd extends Phaser.Scene{
    private background: Phaser.GameObjects.Image;
    private background2: Phaser.GameObjects.Image;
    private pdt: Phaser.GameObjects.Image;
    private spec: button;
    private temp: button;
    private precip: button;
    private backButton: button;
    private backOutline: buttonOutline;
    private specOutline: buttonOutline;
    private tempOutline: buttonOutline;
    private precipOutline: buttonOutline;


    constructor(){
        super({key: 'cdScene'});
    }

    create(){
        this.background=this.add.image(200, 200, "bluebackground");
        this.background.setScale(2.0);
        this.background2=this.add.image(600, 200, "bluebackground");
        this.background2.setScale(2.0);

        this.pdt=this.add.image(200, 200, "CDPdt");
        this.pdt.setScale(0.4);

        this.add.text(400, 50, "Choose a method of analysis:", {fill: '000000'});

        this.spec=new button(this, 475, 125, "spec", 0.7);
        this.spec.on('pointerdown', ()=>this.goToSpec(), this);
        this.specOutline = new buttonOutline(this, 475, 125, "spec", 0.7, 0x184a01);
        this.spec.on('pointerover', ()=>this.specOutline.enterHoverState(), this);
        this.spec.on('pointerout', ()=>this.specOutline.exitHoverState("word"), this);

        this.precip=new button(this, 475, 305, "precip", 0.7);
        this.precip.on('pointerdown', ()=>this.goToPrecip(), this);
        this.precipOutline = new buttonOutline(this, 475, 305, "precip", 0.7, 0x184a01);
        this.precip.on('pointerover', ()=>this.precipOutline.enterHoverState(), this);
        this.precip.on('pointerout', ()=>this.precipOutline.exitHoverState("word"), this);

        this.temp=new button(this, 475, 215, "temp", 0.7);
        this.temp.on('pointerdown', ()=>this.goToTemp(), this);
        this.tempOutline = new buttonOutline(this, 475, 215, "temp", 0.7, 0x184a01);
        this.temp.on('pointerover', ()=>this.tempOutline.enterHoverState(), this);
        this.temp.on('pointerout', ()=>this.tempOutline.exitHoverState("word"), this);
        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goToMain(), this);
        this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
        this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
        this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);
    }

    update(){

    }

    goToSpec(){
        this.scene.start('SpecScene', ["CD"]);
    }

    goToPrecip(){
        this.scene.start('PrecipScene', ["CD"]);
    }

    goToTemp(){
        this.scene.start('TempScene', ["CD"]);
    }

    goToMain(){
        this.scene.start('MainScene');
    }
}
