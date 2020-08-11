import button from "../objects/button";
import buttonOutline from "../objects/buttonOutline";

export default class specHelp extends Phaser.Scene {
    private specText: Phaser.GameObjects.Text;
    private backButton: button;
    private backOutline: buttonOutline

    private info: any;

    constructor(){
        super({key: "specHelpScene"});
    }

    create(){

        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goBack(), this);
        this.backOutline = new buttonOutline(this, 750, 375, "backButton", 0.7, 0x002607);
        this.backButton.on('pointerover', ()=>this.backOutline.enterHoverState(), this);
        this.backButton.on('pointerout', ()=>this.backOutline.exitHoverState("word"), this);

        this.add.text(25, 20, "Spectroscopy and the Method of Continuous Variation", {fontFamily: 'Calibri', fill: "000000", fontStyle:"bold" });
    
        this.specText=this.add.text(25, 50, "Absorption Spectroscopy", {fill: '0320fc', color: '#0320fc', fontFamily: "calibri", fontStyle: "bold"});
        this.specText.setTintFill(0x0320fc);

        let text1=this.add.text(25, 80, "Absorbance spectroscopy and the data it provides relies on a compound's unique pattern of absorption when exposed \nto visible light. This pattern is determined by what is referred to as the Molar Extinction Coefficient, a measure \nwhich increses as the amount of light that a compound absorbs increases.", {fill: "000000", fontFamily: 'calibri'});

        let text2=this.add.text(25, 145, "The absorbance of a solution can provide information on the solution’s concentration through the use of Beer’s Law, \nwhich states that absorbance is equal to the product of the path length (generally 1 cm and referred to as b) \nmultiplied by the molar extinction coefficient (referred to as e) multiplied by the concentration of the solution (referred \nto as c), or A = bec. As this equation demonstrates, there is a direct, positive correlation between the solution’s \nconcentration and the absorbance of the solution so that as concentration increases, so does absorbance.", {fill: "000000", fontFamily: "calibri"});

        let text3=this.add.text(25, 250, "Spectroscopy and the Method of Continuous Variation", {fill: "000000", fontFamily: "calibri", fontStyle: "bold"});
        text3.setTintFill(0x0320fc);

        let text4=this.add.text(25, 280, "At the ideal mole ratio, a greater amount of product will be produced compared to when the reaction occurs at other \nmole ratios. As the total number of mLs of solution remains constant during the MCV experimentation process, this \nindicates that the product will be at its highest concentration, and the solution will therefore have its greatest \nabsorbance, at the ideal mole ratio.", {fill: "000000", fontFamily: "calibri"});
    }

    goBack(){
        this.scene.start("SpecScene", this.info); 
    }

    init(data){
        this.info=data;
    }


}