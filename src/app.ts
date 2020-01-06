import 'phaser';
import { Game } from './game'

namespace App {
    export let game: Phaser.Game;
}

// -------------------------------------------------------------------------
function launch(): void {
    App.game = new Game();
}

// -------------------------------------------------------------------------
window.onload = launch;