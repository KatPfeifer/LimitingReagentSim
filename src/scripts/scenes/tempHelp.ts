import button from "../objects/button";
import buttonOutline from "../objects/buttonOutline";

export default class tempHelp extends Phaser.Scene {
    private backButton: button;
    private backOutline: buttonOutline;
    private info: any;

    constructor(){
        super({key: "tempHelpScene"});
    }

    create(){
        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goBack(), this);
        this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
        this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
        this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);

        this.add.text(25, 20, "Temperature and the Method of Continuous Variation", {fontFamily: 'Calibri', fill: "000000", fontStyle:"bold" });

        let text1 = this.add.text(25, 50, "Endothermic and Exothermic Reactions", {fontFamily: "calibri", fontStyle: "bold", fill: "000000"});
        text1.setTintFill(0x0320fc);
        let text2 = this.add.text(25, 80, "During a reaction, heat can be exchanged between the environment and chemical species as bonds are broken and \nformed. If a reaction releases heat to the environment, this is known as an Exothermic reaction. Conversely, if a \nreaction absorbs heat, it is referred to as Endothermic. The amount of heat exchanged during a reaction is expressed in \nJoules and is generally linked to the moles of product formed. This heat exchange can impact the temperature of the \nsurrounding solution by cooling or heating the solvent. The exact temperature change depends on the amount of \nsolvent present as well as the specific heat of the solvent, or the heat required to raise the temperature of a \nsubstance by a given amount.", {fill: "000000", fontFamily: "calibri"});
    
        let text3 = this.add.text(25, 210, "Temperature Change and the Method of Continuous Variation", {fontFamily: "calibri", fontStyle: "bold", fill: "000000"});
        text3.setTintFill(0x0320fc);
        let text4 = this.add.text(25, 240, "As the ideal mole ratio is approached, a greater amount of product (more moles of product) will be produced. As \ndescribed above, the amount of heat exchanged depends on the amount of product formed so there will be more heat \nexchanged when more product is produced. As a result, temperature will display a maximum change when the \nreactants are present in the ideal mole ratio.", {fill: "000000", fontFamily: "calibri"});
    }

    goBack(){
        this.scene.start("TempScene", this.info); 
    }

    init(data){
        this.info=data;
    }

}