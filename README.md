# ArcadeJs

A game like [TRAZ](https://en.wikipedia.org/wiki/TRAZ) , which is a [Arkanoid](https://nl.wikipedia.org/wiki/Arkanoid) clone.

Inspired by https://speedlazer.net/ @ [Github](https://github.com/speedlazer) using [CraftyJS](http://craftyjs.com/) 

This a reboot with [Phaser 3](https://phaser.io/).

# Road map

Progress game functionality

#### Basic level components
* [x] Wall [surround level]
* [x] Pad  [1x6]
* [x] Ball  [1x1 , angle in angle out, straight line, single speed]
* [ ] Tile solid [1x2, color, clear never]
* [x] Tile standard [1x2, color, clear 1 hit]
* [x] Pid [kill ball]

#### Basic level playStart
* [ ] Win when all none solid tiles cleared 
* [ ] Lives [3 lives, deduct 1 life on ball kill]
* [ ] Restart

#### Play enhanced
* [ ] Bonus - pad increase
* [ ] Score for tile hit/clear
* [ ] Level (level definition format and loader)
* [ ] Multi levels
* [ ] Vertical pad/pid

#### Traz levels
* [ ] Pid/pad locations 
* [ ] Multi pad
* [ ] Multi pid
* [ ] Team Dual player mode

#### Traz game
* [ ] Navigate levels 

  

# Features

Extend variations after road map introduced first variant

#### Tiles
* [ ] Solid
* [ ] Single hit
* [ ] Multi hit
* [ ] Mirror [2x2, change Ball direction]
* [ ] Large shot special behavior

#### Ball
* [x] Standard movement
* [ ] Avoid stuck (angle correction)
* [ ] Change angle on pad impact location
* [ ] Change angle on tile impact location
* [ ] Curved (bonus)

#### Bonus
* [ ] Pid as solid
* [ ] Extra live
* [ ] Increase pad size [max size is pid size]
* [ ] Decrease pad size [min size is half standard size]
* [ ] Shot single [large, 5x , hit count 10]
* [ ] Shot dual [small, 5 sec, hit count 1]
* [ ] Ball multi [random 1 or 2  extra balls]
* [ ] Ball increase speed [max 3x standard speed]
* [ ] Ball decrease speed [max 1/2 standard speed]
* [ ] Ball curbed motion

# Development

This project template combines Phaser 3 with [TypeScript](https://www.typescriptlang.org/) and uses [Rollup](https://rollupjs.org) for bundling.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command         | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `npm install`   | Install project dependencies                                 |
| `npm run watch` | Build project and open web server running project, watching for changes |
| `npm run dev`   | Builds project and open web server, but do not watch for changes |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) |

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development.

## Configuring Rollup

* Edit the file `rollup.config.dev.js` to edit the development build.
* Edit the file `rollup.config.dist.js` to edit the distribution build.

# Resources used

* Art: https://opengameart.org/

* Phaser 3

  * https://photonstorm.github.io/phaser3-docs/index.html
  * https://github.com/photonstorm/phaser3-typescript-project-template
  
  
