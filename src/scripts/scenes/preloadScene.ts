export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("bluebackground", "assets/images/blue.png");
    this.load.image('upArrow', "assets/images/upArrow.png");
    this.load.image("downArrow", 'assets/images/downArrow.png');
    this.load.image("A+B", "assets/images/A + B.png");
    this.load.image("mixSolBut", "assets/images/mixSolButton.png");

    this.load.image("spec", "assets/images/specButton.png");
    this.load.image("temp", "assets/images/tempButton.png");
    this.load.image("precip", "assets/images/precipButton.png");

    this.load.image("empty cuvette", "assets/images/emptyCuvette.png");
    this.load.image("fullCuvette", "assets/images/fullCuvette.png");
    this.load.image("cuvetteOutline", "assets/images/cuvetteOutline.png");
    this.load.image("spectrophotometer", "assets/images/spectrophotometer.png");

    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
  }

  create() {
    this.scene.start('SpecScene');
  }
}
