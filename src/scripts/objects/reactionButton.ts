import SpecScene from "../scenes/spec";

export default class reactionButton extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number, name: string, scale: number){
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(scale);

        this.setInteractive();
        this.on('pointerover', this.enterHoverState, this);
        this.on('pointerout', this.enterRestState, this);
    }

    enterHoverState(){
        this.setTintFill(0x033dfc);
    }

    enterRestState(){
        this.clearTint();
    }
}