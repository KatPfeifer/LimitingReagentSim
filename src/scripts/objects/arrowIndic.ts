import { Tilemaps } from "phaser";

export default class arrowIndic extends Phaser.GameObjects.Image{
    private myName: string;

    constructor(scene: Phaser.Scene, x: number, y: number, name: string){
        super(scene, x, y, "redArrow");
        this.setScale(0.1);
        scene.add.existing(this);
        this.myName=name;
    }

    enterHoverState(){
        this.setAlpha(0.5);
    }

    exitHoverState(selected: string){
        if (selected==this.myName){
            this.setAlpha(1.0);
        }
        if (selected!=this.myName){
            this.setAlpha(0.0);
        }
    }
}