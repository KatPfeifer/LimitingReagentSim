import SpecScene from "../scenes/spec";
import analysisButton from "./analysisButton";

export default class dataPoint extends Phaser.GameObjects.Image{

    private dataValue: number;
    private molFraction: number;
    private label: Phaser.GameObjects.BitmapText;
    private selectedRxn: string;

    constructor(scene: Phaser.Scene, x: number, y: number, dataVal: number, molFr: number, selRxn: string){
        super(scene, x, y, "blackCircle");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.05);
        
        this.dataValue=dataVal;
        this.molFraction=molFr;
        this.selectedRxn=selRxn;

        this.setInteractive();
        this.on('pointerover', ()=>this.updateLabel(), this);
        this.on('pointerout', ()=>this.clearLabel(), this);
    }

    updateLabel(){
        this.label = this.scene.add.bitmapText(600, 250, "pixelFont");
        this.label.fontSize=20;
        this.label.setTintFill(0x000000);
        if (this.selectedRxn=="AB"){
            this.label.text="Selected Data Point: \nX(A): "+ (1-this.molFraction).toString().substring(0,4)+"\nX(B): "+(this.molFraction).toString().substring(0,4)+"\nA: "+(this.dataValue.toString().substring(0,4));
        }
        if (this.selectedRxn=="CD"){
            this.label.text="Selected Data Point: \nX(C): "+ (1-this.molFraction).toString().substring(0,4)+"\nX(D): "+(this.molFraction).toString().substring(0,4)+"\nA: "+(this.dataValue.toString().substring(0,4));
        }
        if (this.selectedRxn=="EF"){
            this.label.text="Selected Data Point: \nX(E): "+ (1-this.molFraction).toString().substring(0,4)+"\nX(F): "+(this.molFraction).toString().substring(0,4)+"\nA: "+(this.dataValue.toString().substring(0,4));
        }
        if (this.selectedRxn=="GH"){
            this.label.text="Selected Data Point: \nX(G): "+ (1-this.molFraction).toString().substring(0,4)+"\nX(H): "+(this.molFraction).toString().substring(0,4)+"\nA: "+(this.dataValue.toString().substring(0,4));
        }
    }

    clearLabel(){
        this.label.text="";
    }




}