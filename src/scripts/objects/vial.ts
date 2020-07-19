export class vial extends Phaser.Physics.Arcade.Image{
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "fullVial");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on("drag", this.doDrag, this);

        this.setAlpha(0.0);
    }

    doDrag(pointer){
        this.x=pointer.x;
        this.y=pointer.y;
    }
}