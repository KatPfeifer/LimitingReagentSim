import analysisButton from "../objects/analysisButton";

export default class ef extends Phaser.Scene{
    private background: Phaser.GameObjects.Image;
    private background2: Phaser.GameObjects.Image;
    private pdt: Phaser.GameObjects.Image;
    private spec: analysisButton;
    private temp: analysisButton;
    private precip: analysisButton;


    constructor(){
        super({key: 'efScene'});
    }

    create(){
        this.background=this.add.image(200, 200, "bluebackground");
        this.background.setScale(2.0);
        this.background2=this.add.image(600, 200, "bluebackground");
        this.background2.setScale(2.0);

        this.pdt=this.add.image(200, 200, "ABPdt");
        this.pdt.setScale(0.3);

        this.add.text(400, 50, "Choose a method of analysis:", {fill: '000000'});

        this.spec=new analysisButton(this, 475, 100, "spec", 0.4);
        this.spec.on('pointerdown', ()=>this.goToSpec(), this);

        this.precip=new analysisButton(this, 475, 200, "precip", 0.4);
        this.precip.on('pointerdown', ()=>this.goToTemp(), this);

        this.temp=new analysisButton(this, 475, 300, "temp", 0.3);
        this.temp.on('pointerdown', ()=>this.goToTemp(), this);
    }

    update(){

    }

    goToSpec(){
        this.scene.start('SpecScene', ["EF"]);
    }

    goToPrecip(){
        this.scene.start('PrecipScene', ["EF"]);
    }

    goToTemp(){
        this.scene.start('TempScene', ["EF"]);
    }
}
