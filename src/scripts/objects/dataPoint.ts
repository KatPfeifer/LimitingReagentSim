import SpecScene from "../scenes/spec";
import analysisButton from "./analysisButton";

export default class dataPoint extends Phaser.GameObjects.Image{

    private dataValue: any;
    private molFraction: any;

    constructor(scene: Phaser.Scene, x: number, y: number, dataVal: number, molFr: number){
        super(scene, x, y, "blackCircle");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.05);
        
        this.dataValue=dataVal;
        this.molFraction=molFr;
    }
}