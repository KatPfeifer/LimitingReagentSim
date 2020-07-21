import arrowButton from "../objects/arrowButton";
import compoundLabel from "../objects/compoundLabel";

export default class moleculeScene extends Phaser.Scene{
    private O2stack: Phaser.GameObjects.Image;
    private H2stack: Phaser.GameObjects.Image;
    private H2Ostack: Phaser.GameObjects.Image;
    private O2LeftStack: Phaser.GameObjects.Image;
    private H2LeftStack: Phaser.GameObjects.Image;
    private O2molec: number;
    private H2molec: number;
    private H2Omolec: number;
    private O2molecLeft: number;
    private H2molecLeft: number;
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

    constructor(){
        super({ key: 'MoleculeScene'});
    }

    create(){
        this.Rbox=this.add.image(150, 170, "rBox");
        this.Rbox.setScale(0.3);
        this.Pbox=this.add.image(570, 170, "pBox");
        this.Pbox.setScale(0.3);
        this.blueArrow=this.add.image(320, 180, "blueArrow");
        this.blueArrow.setScale(0.25);

        this.O2molec=0;
        this.H2molec=0;
        this.H2Omolec=0;
        this.O2molecLeft=0;
        this.H2molecLeft=0;

        this.O2stack=this.add.image(100, 170, "O2stack");
        this.O2stack.setScale(0.19);
        this.H2stack=this.add.image(200, 170, "H2stack");
        this.H2stack.setScale(0.19);
        this.H2Ostack=this.add.image(450, 170, "H2Ostack");
        this.H2Ostack.setScale(0.19);
        this.O2LeftStack=this.add.image(550, 170, "O2stack");
        this.O2LeftStack.setScale(0.19);
        this.H2LeftStack=this.add.image(650, 170, "H2stack");
        this.H2LeftStack.setScale(0.19);


        this.createArrowButtons();
        this.createLabels();
        
        this.updateStacks();
    }

    createArrowButtons(){
        this.up1=new arrowButton(this, 80, 280, "upArrow", "up1");
        this.up1.on('pointerdown', ()=>this.changeMoles("up1"));
        this.down1=new arrowButton(this, 80, 320, "downArrow", "down1");
        this.down1.on('pointerdown', ()=>this.changeMoles("down1"));
        this.up2=new arrowButton(this, 180, 280, "upArrow", "up2");
        this.up2.on('pointerdown', ()=>this.changeMoles("up2"));
        this.down2=new arrowButton(this, 180, 320, "downArrow", "down2");
        this.down2.on('pointerdown', ()=>this.changeMoles("down2"));
    }

    createLabels(){
        this.O2Label=new compoundLabel(this, 75, 290, this.O2molec.toString());
        this.H2Label=new compoundLabel(this, 175, 290, this.H2molec.toString());
        this.H2OLabel=new compoundLabel(this, 450, 290, this.H2Omolec.toString());
        this.O2LeftLabel=new compoundLabel(this, 600, 290, this.O2molecLeft.toString());
        this.H2LeftLabel=new compoundLabel(this, 750, 290, this.H2molecLeft.toString());
    }

    update(){

    }

    updateStacks(){
        this.O2stack.setCrop(0, this.O2stack.height-(this.O2stack.height*(this.O2molec/10)), this.O2stack.width, this.O2stack.height);
        this.H2stack.setCrop(0, this.H2stack.height-(this.H2stack.height*(this.H2molec/10)), this.H2stack.width, this.H2stack.height);
        this.H2Ostack.setCrop(0, this.H2Ostack.height-(this.H2Ostack.height*(this.H2Omolec/10))+5, this.H2Ostack.width, this.H2Ostack.height);
        this.O2LeftStack.setCrop(0, this.O2LeftStack.height-(this.O2LeftStack.height*(this.O2molecLeft/10)), this.O2LeftStack.width, this.O2LeftStack.height);
        this.H2LeftStack.setCrop(0, this.H2LeftStack.height-(this.H2LeftStack.height*(this.H2molecLeft/10)), this.H2LeftStack.width, this.H2LeftStack.height);
    }

    changeMoles(name: string){
        if(name=="up1"&&this.O2molec<10){
            this.O2molec+=1;
        }
        if(name=="down1"&&this.O2molec>0){
            this.O2molec-=1;
        }
        if(name=="up2"&&this.H2molec<10){
            this.H2molec+=1;
        }
        if(name=="down2"&&this.H2molec>0){
            this.H2molec-=1;
        }

        this.findPdts();
        this.updateStacks();
        this.updateLabels();
    }

    findPdts(){
        if (this.O2molec*2>=this.H2molec){
            if ((this.O2molec*2-this.H2molec)%2==0){
                this.H2Omolec=this.H2molec;
                this.H2molecLeft=0;
                this.O2molecLeft=this.O2molec-this.H2Omolec/2;
            }
            else{
                let modH2=this.H2molec-1;
                this.H2Omolec=modH2;
                this.H2molecLeft=1;
                this.O2molecLeft=this.O2molec-modH2/2;
            }
        }
        else {
            this.H2Omolec=2*this.O2molec;
            this.H2molecLeft=this.H2molec-this.H2Omolec;
            this.O2molecLeft=0;
        }
    }

    updateLabels(){
        this.O2Label.text=this.O2molec.toString();
        this.H2Label.text=this.H2molec.toString();
        this.H2OLabel.text=this.H2Omolec.toString();
        this.O2LeftLabel.text=this.O2molecLeft.toString();
        this.H2LeftLabel.text=this.H2molecLeft.toString();
    }
}