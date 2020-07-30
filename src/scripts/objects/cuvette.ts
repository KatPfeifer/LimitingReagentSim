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

    changeColor(abs: number){
        if (this.between(abs, 0.2, 0)){
            this.setTintFill(0xffb5b9);
        }
        if (this.between(abs, 0.4, 0.2)){
            this.setTintFill(0xff9197);
        }
        if (this.between(abs, 0.6, 0.4)){
            this.setTintFill(0xff7077);
        }
        if (this.between(abs, 0.8, 0.6)){
            this.setTintFill(0xff545d);
        }
        if (this.between(abs, 1.0, 0.8)){
            this.setTintFill(0xff2e38);
        }
        if (this.between(abs, 1.2, 1.0)){
            this.setTintFill(0xff2530);
        }
        if (this.between(abs, 1.4, 1.2)){
            this.setTintFill(0xff0512);
        }
        if (this.between(abs, 3, 1.4)){
            this.setTintFill(0xe8000c);
        }
    }

    between(num: number, up: number, down: number){
        if (num<=up&&num>=down){
            return true;
        }
        else {
            return false;
        }
    }
}