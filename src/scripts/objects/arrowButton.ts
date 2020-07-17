import SpecScene from '../scenes/spec';

export default class arrowButton extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x:number, y: number, type: string, name: string){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.075);

        this.setInteractive();
        //this.on('pointerdown', ()=>scene.changemLs(name));
    }
}