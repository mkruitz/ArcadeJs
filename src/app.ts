import 'phaser';
import { MainMenu, GameOver } from './mainmenu';
import { Level } from './level';
import { Levels } from './levels';

namespace App {

    // game
    export let game: Phaser.Game = null;
}

// -------------------------------------------------------------------------
function launch(): void {

    var config = {
        type: Phaser.WEBGL,
        backgroundColor: '#DDDDDD',
        width: Levels.levelDimension.width * 10,
        height:  Levels.levelDimension.height * 10,
        physics: {
          default: 'arcade'
        },
        scene: [ MainMenu, Level, GameOver ]
    };
    
    App.game = new Phaser.Game(config);
    
}

// -------------------------------------------------------------------------
window.onload = launch;