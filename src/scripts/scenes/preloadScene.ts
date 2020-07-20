export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("box", "assets/images/box.png");
    this.load.image("rBox", "assets/images/rBox.png");
    this.load.image("pBox", "assets/images/pBox.png");
    this.load.image("compoundBox", "assets/images/compoundBox.png");

    this.load.image("Fe2O3", "assets/images/Fe2O3.png");
    this.load.image("FeRxn", "assets/images/FeRxn.png");
    this.load.image("C", "assets/images/C.png");
    this.load.image("Fe", "assets/images/Fe.png");
    this.load.image("blueArrow", "assets/images/blueArrow.png");
    this.load.image("CO2", "assets/images/CO2.png");

    this.load.image("bluebackground", "assets/images/blue.png");
    this.load.image('upArrow', "assets/images/upArrow.png");
    this.load.image("downArrow", 'assets/images/downArrow.png');
    this.load.image("A+B", "assets/images/A + B.png");
    this.load.image("C+D", "assets/images/C + D.png");
    this.load.image("E+F", "assets/images/E + F.png");
    this.load.image("mixSolBut", "assets/images/mixSolButton.png");
    this.load.image("graphButton", "assets/images/graphButton.png");
    this.load.image("Pdt", "assets/images/Pdt.png");
    this.load.image("ABPdt", "assets/images/ABPdt.png");
    this.load.image("CDPdt", "assets/images/CDPdt.png");
    this.load.image("EFPdt", "assets/images/EFPdt.png");
    this.load.image("backButton", "assets/images/backButton.png");


    this.load.image("spec", "assets/images/specButton.png");
    this.load.image("temp", "assets/images/tempButton.png");
    this.load.image("precip", "assets/images/precipButton.png");

    this.load.image("empty cuvette", "assets/images/emptyCuvette.png");
    this.load.image("fullCuvette", "assets/images/fullCuvette.png");
    this.load.image("cuvetteOutline", "assets/images/cuvetteOutline.png");
    this.load.image("spectrophotometer", "assets/images/spectrophotometer.png");
    this.load.image("absGraphAB", "assets/images/absGraphAB.png");
    this.load.image("absGraphCD", "assets/images/absGraphCD.png");
    this.load.image("absGraphEF", "assets/images/absGraphEF.png");
    this.load.image("blackCircle", "assets/images/blackCircle.png");

    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    this.load.image("tempGraphAB", "assets/images/tempGraphAB.png");
    this.load.image("tempGraphAB", "assets/images/tempGraphAB.png");
    this.load.image("tempGraphAB", "assets/images/tempGraphAB.png");
    this.load.image("emptyBeaker", "assets/images/emptyBeaker.png");
    this.load.image("fullBeaker", "assets/images/fullBeaker.png");
    this.load.image("thermoHead", "assets/images/thermoHead.png");

    this.load.image("fullVial", "assets/images/fullVial.png");
    this.load.image("emptyVial", "assets/images/emptyVial.png");
    this.load.image("scale", "assets/images/scale.png");
    this.load.image("precipGraphAB", "assets/images/precipGraphAB.png");
    this.load.image("precipGraphCD", "assets/images/precipGraphCD.png");
    this.load.image("precipGraphEF", "assets/images/precipGraphEF.png");
  }

  create() {
    this.scene.start('GramScene');
  }
}
