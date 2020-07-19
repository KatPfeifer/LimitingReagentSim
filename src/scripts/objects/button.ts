export default class button extends Phaser.GameObjects.Image{
    constructor(scene: Phaser.Scene, x: number, y: number, name: string, scale: number){
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(scale);
        this.setInteractive();
    }
}