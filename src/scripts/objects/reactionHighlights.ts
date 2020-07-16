export default class reactionHighlights extends Phaser.GameObjects.Image{
    constructor(scene: Phaser.Scene, x: number, y: number, name: string){
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(0.3);
        this.setTintFill(0x033dfc);
    }
}