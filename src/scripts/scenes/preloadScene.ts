export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("box", "assets/images/box.png");
    this.load.image("rBox", "assets/images/rBox.png");
    this.load.image("pBox", "assets/images/pBox.png");
    this.load.image("compoundBox", "assets/images/compoundBox.png");
    this.load.image("MCVshot", "assets/images/MCVshot.png");
    this.load.image("LRshot", "assets/images/LRshot.png");
    this.load.image("blackBox", "assets/images/blackBox.png");
    this.load.image("ABbutton", "assets/images/ABbutton.png");
    this.load.image("CDbutton", "assets/images/CDbutton.png");
    this.load.image("EFbutton", "assets/images/EFbutton.png");
    this.load.image("O2H2button", "assets/images/O2H2button.png");
    this.load.image("Fe2O3Cbutton", "assets/images/Fe2O3Cbutton.png");
    this.load.image("products", "assets/images/products.png");
    this.load.image("reactants", "assets/images/reactants.png");
    this.load.image("leftovers", "assets/images/leftovers.png");
    this.load.image("practice", "assets/images/practice.png");

    this.load.image("Fe2O3", "assets/images/Fe2O3.png");
    this.load.image("FeRxn", "assets/images/FeRxn.png");
    this.load.image("C", "assets/images/C.png");
    this.load.image("Fe", "assets/images/Fe.png");
    this.load.image("blueArrow", "assets/images/blueArrow.png");
    this.load.image("CO2", "assets/images/CO2.png");

    this.load.image("Festack", "assets/images/Festack.png");
    this.load.image("Fe2O3stack", "assets/images/Fe2O3stack.png");
    this.load.image("Cstack", "assets/images/Cstack.png");
    this.load.image("CO2stack", "assets/images/CO2stack.png");

    this.load.image("O2stack", "assets/images/O2stack.png");
    this.load.image("H2stack", "assets/images/H2stack.png");
    this.load.image("H2Ostack", "assets/images/H2Ostack.png");
    this.load.image("O2Rxn", "assets/images/O2Rxn.png");
    this.load.image("O2", "assets/images/O2.png");
    this.load.image("H2", "assets/images/H2.png");
    this.load.image("H2O", "assets/images/H2O.png");
    this.load.image("gramButton", "assets/images/gramButton.png");
    this.load.image("moleculeButton", "assets/images/moleculeButton.png");

    this.load.image("bluebackground", "assets/images/blue.png");
    this.load.image("redArrow", "assets/images/redArrow.png");
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
    this.load.image("mainButton", "assets/images/mainButton.png");
    this.load.image("button1", "assets/images/1button.png");
    this.load.image("button2", "assets/images/2button.png");
    this.load.image("button3", "assets/images/3button.png");

    this.load.image("spec", "assets/images/specButton.png");
    this.load.image("temp", "assets/images/tempButton.png");
    this.load.image("precip", "assets/images/precipButton.png");
    this.load.image("MCVLabel", "assets/images/MCV Label.png");
    this.load.image("LRLabel", "assets/images/LRLabel.png");

    this.load.image("mLsA", "assets/images/mLsA.png");
    this.load.image("mLsB", "assets/images/mLsB.png");
    this.load.image("mLsC", "assets/images/mLsC.png");
    this.load.image("mLsD", "assets/images/mLsD.png");
    this.load.image("mLsE", "assets/images/mLsE.png");
    this.load.image("mLsF", "assets/images/mLsF.png");
    this.load.image("mLsG", "assets/images/mLsG.png");
    this.load.image("mLsH", "assets/images/mLsH.png");

    this.load.image("empty cuvette", "assets/images/emptyCuvette2.png");
    this.load.image("fullCuvette", "assets/images/fullCuvette2.png");
    this.load.image("cuvetteOutline", "assets/images/cuvetteOutline2.png");
    this.load.image("spectrophotometer", "assets/images/spectrophotometer.png");
    this.load.image("absGraphAB", "assets/images/absGraphAB.png");
    this.load.image("absGraphCD", "assets/images/absGraphCD.png");
    this.load.image("absGraphEF", "assets/images/absGraphEF.png");
    this.load.image("blackCircle", "assets/images/blackCircle.png");
    this.load.image("absGraphGH", "assets/images/absGraphGH.png");

    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    this.load.bitmapFont("calibriFont", "assets/font/calibriFont_0.png", "assets/font/calibriFont.fnt");
    this.load.bitmapFont("calibri", "assets/font/calibri_with_scripts_0.png", 
                         "assets/font/calibri_with_scripts.fnt");

    this.load.image("tempGraphAB", "assets/images/tempGraphAB.png");
    this.load.image("tempGraphCD", "assets/images/tempGraphCD.png");
    this.load.image("tempGraphEF", "assets/images/tempGraphEF.png");
    this.load.image("emptyBeaker", "assets/images/emptyBeaker.png");
    this.load.image("fullBeaker", "assets/images/fullBeaker.png");
    this.load.image("thermoHead", "assets/images/thermoHead.png");

    this.load.image("fullVial", "assets/images/fullVial.png");
    this.load.image("emptyVial", "assets/images/emptyVial.png");
    this.load.image("scale", "assets/images/scale.png");
    this.load.image("precipGraphAB", "assets/images/precipGraphAB.png");
    this.load.image("precipGraphCD", "assets/images/precipGraphCD.png");
    this.load.image("precipGraphEF", "assets/images/precipGraphEF.png");

    this.load.image("nextButton", "assets/images/nextButton.png");
    this.load.image("SO2Rxn", "assets/images/SO2Rxn.png");
    this.load.image("FeCl2Rxn", "assets/images/FeCl2Rxn.png");
    this.load.image("NH3Rxn", "assets/images/NH3Rxn.png");
    this.load.image("MWbox", "assets/images/MWbox.png");
    this.load.html("inputForm", "assets/text/inputform.html");
    this.load.image("C2H4Rxn", "assets/images/C2H4Rxn.png");
    this.load.image("SiRxn", "assets/images/SiRxn.png");
    this.load.image("wrongLR", "assets/images/wrongLR.png");
    this.load.image("noMoles", "assets/images/noMoles.png");
    this.load.image("correct", "assets/images/correct.png");
    this.load.image("LRhelp", "assets/images/LRhelp.png");
    this.load.image("LRhelp2", "assets/images/LRhelp2.png");
    this.load.image("PY", "assets/images/PY.png");
    this.load.image("PdtFormed", "assets/images/PdtFormed.png");
    this.load.image("IDLR", "assets/images/IDLR.png");
    this.load.image("ReactantLeft", "assets/images/ReactantLeft.png");
    this.load.image("PYExample", "assets/images/PYExampleFull.png");
    this.load.image("decimal", "assets/images/decimal.png");
    this.load.image("pyHelp", "assets/images/pyHelp.png");
    this.load.image("reactantUsed", "assets/images/reactantUsed");
    this.load.image("RLHelp", "assets/images/RLHelp.png")
    this.load.image("NaRxn", "assets/images/NaRxn.png");
    this.load.image("NaClRxn", "assets/images/NaClRxn.png");
    this.load.image("CORxn", "assets/images/CORxn.png");
    this.load.image("exampleButton", "assets/images/exampleButton.png");
    this.load.image("helpButton", "assets/images/helpButton.png");
  }

  create() {
    this.scene.start('TempScene', ['EF', []]);
  }
}
