export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("bluebackground", "assets/images/blue.png");
    this.load.image("A+B", "assets/images/A + B.png");

    this.load.image("spec", "assets/images/specButton.png");
    this.load.image("temp", "assets/images/tempButton.png");
    this.load.image("precip", "assets/images/precipButton.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
