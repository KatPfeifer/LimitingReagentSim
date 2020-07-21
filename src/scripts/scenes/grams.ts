import compoundLabel from "../objects/compoundLabel";
import arrowButton from "../objects/arrowButton";
import button from "../objects/button";

export default class gramScene extends Phaser.Scene{
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
    private Fe2O3box: Phaser.GameObjects.Image;
    private Cbox:Phaser.GameObjects.Image;
    private Febox:Phaser.GameObjects.Image;
    private CO2box: Phaser.GameObjects.Image;
    private Fe2O3LeftBox:Phaser.GameObjects.Image;
    private CLeftBox:Phaser.GameObjects.Image;
    private Rbox: Phaser.GameObjects.Image;
    private Pbox: Phaser.GameObjects.Image;
    private blueArrow: Phaser.GameObjects.Image;
    private backButton: button;
    
    
    constructor(){
        super({ key: 'GramScene'});
    }

    create(){
        this.Rbox=this.add.image(150, 170, "rBox");
        this.Rbox.setScale(0.3);
        this.Pbox=this.add.image(570, 170, "pBox");
        this.Pbox.setScale(0.3);

        this.Fe2O3=0.0001;
        this.C=0.0001;
        this.Fe=0.0001;
        this.CO2=0.0001;
        this.Fe2O3Left=0.0001;
        this.CLeft=0.0001;

        this.createArrowButtons();
        this.createLabels();
        this.createPics();

        this.blueArrow=this.add.image(320, 180, "blueArrow");
        this.blueArrow.setScale(0.25);

        this.Fe2O3box=this.add.image(90, 183, "compoundBox");
        this.Fe2O3box.setScale(0.3);
        this.Cbox=this.add.image(190, 183, "compoundBox");
        this.Cbox.setScale(0.3);
        this.Febox=this.add.image(420, 183, "compoundBox");
        this.Febox.setScale(0.3);
        this.CO2box=this.add.image(520, 183, "compoundBox");
        this.CO2box.setScale(0.3);
        this.Fe2O3LeftBox=this.add.image(620, 183, "compoundBox");
        this.Fe2O3LeftBox.setScale(0.3);
        this.CLeftBox=this.add.image(720, 183, "compoundBox");
        this.CLeftBox.setScale(0.3);
        this.updateBoxHeights();

        this.add.text(500, 5, "Use the arrows to change the \nnumber of grams of each\nreactant and see how the grams\nof product change", {fill: "000000"});

        this.backButton=new button(this, 750, 375, "backButton", 0.7);
        this.backButton.on('pointerdown', ()=>this.goToMain(), this);
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
          this.Fe2O3Label= new compoundLabel(this, 67, 290, this.Fe2O3.toString().substring(0,3));
          this.CLabel=new compoundLabel(this, 167, 290, this.C.toString().substring(0,3));
          this.FeLabel= new compoundLabel(this, 400, 290, this.Fe.toString().substring(0,3));
          this.CO2Label=new compoundLabel(this, 500, 290, this.CO2.toString().substring(0,3));
          this.Fe2O3LeftLabel= new compoundLabel(this, 600, 290, this.Fe2O3Left.toString().substring(0,3));
          this.CLeftLabel=new compoundLabel(this, 700, 290, this.CLeft.toString().substring(0,3));
      }

      createPics(){
        this.FeRxn=this.add.image(250, 40, "FeRxn");
        this.FeRxn.setScale(0.5);

        this.Fe2O3pic=this.add.image(125, 300, "Fe2O3");
        this.Fe2O3pic.setScale(0.1);
        this.Fe2O3pic.setTintFill(0xff0040);

        this.Fe2O3leftPic=this.add.image(660, 300, "Fe2O3");
        this.Fe2O3leftPic.setScale(0.1);
        this.Fe2O3leftPic.setTintFill(0xff0040);

        this.Cpic=this.add.image(210, 300, "C");
        this.Cpic.setScale(0.06);
        this.Cpic.setTintFill(0xff0040);

        this.CLeftPic=this.add.image(740, 300, "C");
        this.CLeftPic.setScale(0.06);
        this.CLeftPic.setTintFill(0xff0040);

        this.Fepic=this.add.image(450, 300, "Fe");
        this.Fepic.setScale(0.05);
        this.Fepic.setTintFill(0xff0040);

        this.CO2pic=this.add.image(550, 300, "CO2");
        this.CO2pic.setScale(0.08);
        this.CO2pic.setTintFill(0xff0040);
      }

    update(){

    }

    findLR(){
        let molFe2O3 = this.Fe2O3/159.69;
        let molC = this.C/12.01;
        if (molFe2O3/2<molC/3){
            return molFe2O3/2;
        }
        else {
            return molC/3;
        }
    }

    changeGrams(name: string){
        if (name=="up1"&&this.Fe2O3<20){
            this.Fe2O3+=0.5;
        }
        if (name=="up2"&&this.C<20){
            this.C+=0.5;
        }
        if (name=="down1"&&this.Fe2O3>0){
            this.Fe2O3-=0.5;
        }
        if (name=="down2"&&this.C>0){
            this.C-=0.5;
        }
        
        this.findPdts();
        this.updateBoxHeights();
        this.updateLabels();
    }

    findPdts(){
        let mol=this.findLR();
        let molFe2O3 = this.Fe2O3/159.69;
        let molC = this.C/12.01;
        this.Fe=mol*4*55.85;
        this.CO2=mol*3*44.01;
        this.Fe2O3Left=(molFe2O3-2*mol)*159.69;
        this.CLeft=(molC-3*mol)*12.01;
    }

    updateBoxHeights(){
        this.Fe2O3box.setCrop(0, this.Fe2O3box.height-(this.Fe2O3box.height*(this.Fe2O3/20)), this.Fe2O3box.width, this.Fe2O3box.height);
        this.Cbox.setCrop(0, this.Cbox.height-(this.Cbox.height*(this.C/20)), this.Cbox.width, this.Cbox.height);
        this.Febox.setCrop(0, this.Febox.height-(this.Febox.height*(this.Fe/20)), this.Febox.width, this.Febox.height);
        this.CO2box.setCrop(0, this.CO2box.height-(this.CO2box.height*(this.CO2/20)), this.CO2box.width, this.CO2box.height);
        this.Fe2O3LeftBox.setCrop(0, this.Fe2O3LeftBox.height-(this.Fe2O3LeftBox.height*(this.Fe2O3Left/20)), this.Fe2O3LeftBox.width, this.Fe2O3LeftBox.height);
        this.CLeftBox.setCrop(0, this.CLeftBox.height-(this.CLeftBox.height*(this.CLeft/20)), this.CLeftBox.width, this.CLeftBox.height);
    }

    updateLabels(){
        this.Fe2O3Label.text=this.Fe2O3.toFixed(1);
        this.CLabel.text=this.C.toFixed(1);
        this.FeLabel.text=this.Fe.toFixed(1);
        this.CO2Label.text=this.CO2.toFixed(1);
        this.Fe2O3LeftLabel.text=this.Fe2O3Left.toFixed(1);
        this.CLeftLabel.text=this.CLeft.toFixed(1);
    }

    goToMain(){
        this.scene.start('MainScene');
    }
}