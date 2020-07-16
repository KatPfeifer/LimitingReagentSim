import SpecScene from "../scenes/spec";
import analysisButton from "./analysisButton";

export default class dataPoint extends Phaser.GameObjects.Image{

    private dataValue: any;
    private molFraction: any;

    constructor(scene: Phaser.Scene, x: number, y: number, name: string, dataVal: number, molFr: number){
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.dataValue=dataVal;
        this.molFraction=molFr;
    }
}