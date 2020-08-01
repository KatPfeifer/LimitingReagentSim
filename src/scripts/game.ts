import 'phaser';
import MainScene from './scenes/mainScene';
import SpecScene from './scenes/spec';
import PreloadScene from './scenes/preloadScene';
import TempScene from './scenes/temp';
import PrecipScene from './scenes/precip';
import GramScene from './scenes/grams';
import MoleculeScene from './scenes/molecules';
import abScene from './scenes/ab';
import cdScene from './scenes/cd';
import efScene from './scenes/ef';
import O2gs from './scenes/O2gs';
import FeMolec from './scenes/FeMolec';
import pdtFormed from './scenes/pdtFormed';
import reactantLeft from './scenes/reactantLeft';
import pickLR from './scenes/pickLR';
import percentYield from './scenes/percentYield';
import exampleMCV from './scenes/exampleMCV';
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, O2gs, percentYield, pdtFormed, exampleMCV, pickLR, reactantLeft, FeMolec, SpecScene, MainScene, cdScene, efScene, TempScene, PrecipScene, GramScene, abScene, MoleculeScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            //gravity: { y: 400 }
        }
    },
    dom: {
        createContainer: true,
    },
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});