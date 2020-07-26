export default class buttonOutline extends Phaser.GameObjects.Image{
    private myName: string;
    
    constructor(scene: Phaser.Scene, x: number, y: number, name: string, scale: number, tint: number){
        super(scene, x, y, name);
        scene.add.existing(this);

        this.setScale(scale);
        this.setAlpha(0.0);
        this.myName=name;
        this.setTintFill(tint);
    }

    enterHoverState(){
        this.setAlpha(0.5);
    }

    exitHoverState(selected: string){
        if (selected==this.myName){
            this.setAlpha(0.3);
        }
        if (selected!=this.myName){
            this.setAlpha(0.0);
        }
    }
}