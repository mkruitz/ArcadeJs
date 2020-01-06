import { Level } from './level';

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainmenu');
        Phaser.Scene.call(this, { key: 'mainmenu' });
    }

    preload() {
        this.load.bitmapFont('ice', 'assets/fonts/iceicebaby.png', 'assets/fonts/iceicebaby.xml');
    }

    create() {
        console.log('%c mainmenu ', 'background: green; color: white; display: block;');

        let title = this.add.dynamicBitmapText(250, 300, 'ice', 'ReTrazed', 180)

        title.setInteractive();

        title.once('pointerup', function (this: MainMenu) {
            this.scene.start('level');
        }, this);
    }
}


export class GameOver extends Phaser.Scene {

    constructor() {
        super('gameover');
        Phaser.Scene.call(this, { key: 'gameover' });
    }

    preload() {
        this.load.bitmapFont('ice', 'assets/fonts/iceicebaby.png', 'assets/fonts/iceicebaby.xml');
    }

    create() {
        this.game.scene.remove('level');
        this.game.scene.add('level', Level);

        console.log('%c gameover ', 'background: green; color: white; display: block;');

        let title = this.add.dynamicBitmapText(250, 300, 'ice', 'ReTrazed', 180)

        title.setInteractive();

        title.once('pointerup', function (this: GameOver) {
            this.scene.start('level');
        }, this);
    }
}