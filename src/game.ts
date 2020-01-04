import 'phaser';
import { LevelLayout } from './level/level-layout';

import { MainMenu, GameOver } from './scenes/mainmenu';
import { Level } from './scenes/level';
import { Levels } from './level/levels';

export class Game extends Phaser.Game {

    constructor() {
        let levelLayout = new LevelLayout(Levels.levelDimension);

        super(
             {
                type: Phaser.WEBGL,
                backgroundColor: '#DDDDDD',
                width: levelLayout.width(),
                height:  levelLayout.height(),
                physics: {
                  default: 'arcade'
                },
                scene: [ MainMenu, Level, GameOver ]
            }
        );
    }
}
