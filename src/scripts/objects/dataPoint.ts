import SpecScene from "../scenes/spec";
import analysisButton from "./analysisButton";

export default class dataPoint extends Phaser.GameObjects.Image{

    private dataValue: number;
    private molFraction: number;
    private label: Phaser.GameObjects.BitmapText;
    private selectedRxn: string;
    private sceneName: string;

    constructor(scene: Phaser.Scene, x: number, y: number, dataVal: number, molFr: number, selRxn: string, scenename: string){
        super(scene, x, y, "blackCircle");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.05);
        
        this.dataValue=dataVal;
        this.molFraction=molFr;
        this.selectedRxn=selRxn;
        this.sceneName=scenename;

        this.setInteractive();
        this.on('pointerover', ()=>this.updateLabel(), this);
        this.on('pointerout', ()=>this.clearLabel(), this);
    }

    updateLabel(){
        this.label = this.scene.add.bitmapText(600, 250, "calibri");
        this.label.fontSize=20;
        if (this.sceneName=="Spec"){
            if (this.selectedRxn=="AB"){
                this.label.text="Selected Data Point: \nX(A): "+ (1-this.molFraction).toFixed(2)+"\nX(B): "+(this.molFraction).toFixed(2)+"\nA: "+(this.dataValue.toFixed(2));
            }
            if (this.selectedRxn=="CD"){
                this.label.text="Selected Data Point: \nX(C): "+ (1-this.molFraction).toFixed(2)+"\nX(D): "+(this.molFraction).toFixed(2)+"\nA: "+(this.dataValue.toFixed(2));
            }
            if (this.selectedRxn=="EF"){
                this.label.text="Selected Data Point: \nX(E): "+ (1-this.molFraction).toFixed(2)+"\nX(F): "+(this.molFraction).toFixed(2)+"\nA: "+(this.dataValue.toFixed(2));
            }
            if (this.selectedRxn=="GH"){
                this.label.text="Selected Data Point: \nX(G): "+ (1-this.molFraction).toFixed(2)+"\nX(H): "+(this.molFraction).toFixed(2)+"\nA: "+(this.dataValue.toFixed(2));
            }
        }
        if (this.sceneName=="Temp"){
            if (this.selectedRxn=="AB"){
                this.label.text="Selected Data Point: \nX(A): "+ (1-this.molFraction).toFixed(2)+"\nX(B): "+(this.molFraction).toFixed(2)+"\nTC: "+(this.dataValue.toFixed(1));
            }
            if (this.selectedRxn=="CD"){
                this.label.text="Selected Data Point: \nX(C): "+ (1-this.molFraction).toFixed(2)+"\nX(D): "+(this.molFraction).toFixed(2)+"\nTC: "+(this.dataValue.toFixed(1));
            }
            if (this.selectedRxn=="EF"){
                this.label.text="Selected Data Point: \nX(E): "+ (1-this.molFraction).toFixed(2)+"\nX(F): "+(this.molFraction).toFixed(2)+"\nTC: "+(this.dataValue.toFixed(1));
            }
        }
        if (this.sceneName=="Precip"){
            if (this.selectedRxn=="AB"){
                this.label.text="Selected Data Point: \nX(A): "+ (1-this.molFraction).toFixed(2)+"\nX(B): "+(this.molFraction).toFixed(2)+"\nPM: "+(this.dataValue.toFixed(2));
            }
            if (this.selectedRxn=="CD"){
                this.label.text="Selected Data Point: \nX(C): "+ (1-this.molFraction).toFixed(2)+"\nX(D): "+(this.molFraction).toFixed(2)+"\nPM: "+(this.dataValue.toFixed(2));
            }
            if (this.selectedRxn=="EF"){
                this.label.text="Selected Data Point: \nX(E): "+ (1-this.molFraction).toFixed(2)+"\nX(F): "+(this.molFraction).toFixed(2)+"\nPM: "+(this.dataValue.toFixed(2));
            }
        }
    }

    clearLabel(){
        this.label.text="";
    }




}