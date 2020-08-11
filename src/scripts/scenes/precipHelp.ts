import button from "../objects/button";
import buttonOutline from "../objects/buttonOutline";

export default class precipHelp extends Phaser.Scene {

    private backButton: button;
    private backOutline: buttonOutline;

    private info: any;

    constructor(){
        super({key: "precipHelpScene"});
    }


    create() {
        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goBack(), this);
        this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
        this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
        this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);
        let text1=this.add.text(25, 20, "Precipitation Analysis and the Method of Continuous Variation", {fill: "000000", fontFamily: "calibri", fontStyle: 'bold'});

        let text2=this.add.text(25, 50, "This reaction creates products where one of the products is not soluble in the provided solvent. As a result, it \nprecipitates out of solution and provides a solid that can be massed and compared with the precipitate of reactions \nusing alternate mole ratios. At the ideal mole ratio, the greatest extensive change will be observed which in this case \nis the amount of precipitate collected at the end of the reaction. Thus, the greatest amount of precipitate will be \ncollected when the reactants are at the ideal mole ratio.", {fill: "000000", fontFamily: "calibri"});
    }

    goBack(){
        this.scene.start("PrecipScene", this.info); 
    }

    init(data){
        this.info=data;
    }
}
