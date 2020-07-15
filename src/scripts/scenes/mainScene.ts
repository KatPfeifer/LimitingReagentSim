import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private ABRxn: any;
  private ABRxnHighlight: any;
  private background: any;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background=this.add.image(200, 200, "bluebackground");
    this.background.setScale(2.0);
    
    this.ABRxnHighlight=this.add
    .image(100,100, "A+B")
    .setScale(0.3)
    .setTintFill(0x033dfc);

    this.ABRxn=this.add
    .image(100, 100, "A+B")
    .setScale(.3);
    //use mouse over and set tint fill to highlight when the image is moused over

    

    
    //this.exampleObject = new ExampleObject(this, 0, 0);
  }

  update() {
  }
}
