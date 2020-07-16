export class cuvette extends Phaser.Physics.Arcade.Image{
    constructor(scene: Phaser.Scene, x: number, y: number, name: string){
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.15);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on("drag", this.doDrag, this);
    }

    doDrag(pointer){
        this.x=pointer.x;
        this.y=pointer.y;
    }
}