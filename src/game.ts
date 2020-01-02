import 'phaser';

export default class Level extends Phaser.Scene
{   
    constructor ()
    {
        super('Traz - work from there');
    }

    preload ()
    {
    }

    create ()
    {
    }
}

const config = {
    type: Phaser.WEBGL,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Level,
    physics: {
        default: 'arcade'
    }
};

const game = new Phaser.Game(config);
