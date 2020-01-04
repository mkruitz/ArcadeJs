import 'phaser';
import { LevelLayout } from './level-configuration';

import { MainMenu, GameOver } from './mainmenu';
import { Level } from './level';
import { Levels } from './levels';

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
