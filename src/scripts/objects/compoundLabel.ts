export default class compoundLabel extends Phaser.GameObjects.BitmapText{
    constructor(scene: Phaser.Scene, x: number, y: number, t: string){
        super(scene, x, y, "calibri");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.fontSize=25;
        this.text=t;
    }
}