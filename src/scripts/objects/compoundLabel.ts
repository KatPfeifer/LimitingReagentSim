export default class compoundLabel extends Phaser.GameObjects.BitmapText{
    constructor(scene: Phaser.Scene, x: number, y: number, t: string){
        super(scene, x, y, "pixelFont");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.fontSize=30;
        this.setTintFill(0x000000);
        this.text=t;
    }
}