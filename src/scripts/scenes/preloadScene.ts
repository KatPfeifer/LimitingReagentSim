export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("shirt", "assets/images/shirt.png");
    this.load.image("bluebackground", "assets/images/blue.png");
    this.load.image("A+B", "assets/images/A + B.png");
    //this.load.image("imageName", "assets/images/imageName.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
