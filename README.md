# ArcadeJs

Game like [TRAZ](https://en.wikipedia.org/wiki/TRAZ)  which is a [Arkanoid](https://nl.wikipedia.org/wiki/Arkanoid) clone.

# Road map

Progress game functionality

## Basic level components
* [x] Wall [surround level]
* [x] Pad  [1x6]
* [x] Ball  [1x1 , angle in angle ou, straight line, single speed]
* [ ] Pid [kill ball]
* [x] Tile solid [1x2, color, clear never]
* [x] Tile standard [1x2, color, clear 1 hit]

## Basic level playStart
* [ ] Win when all none solid tiles cleared 
* [ ] Lives [3 lives, deduct 1 life on ball kill]
* [ ] Restart

## Play enhanced
* [ ] Bonus - pid [pid as solid, 5 sec]
* [ ] Score for tile hit/clear
* [x] Level (level definition format and loader)
* [ ] Multi levels

## Traz levels
* [ ] Pid/pad locations 
* [ ] Multi pad
* [ ] Multi pid
* [ ] Team Dual player mode

## Traz game
* [ ] Navigate levels 

# Features

Extend variations after road map introduced first variant

## Tiles
* [x] Solid
* [x] Single hit
* [ ] Multi hit
* [ ] Mirror [2x2, change Ball direction]
* [ ] Large shot special behavior

## Ball
* [ ] Standard movement
* [ ] Avoid stuck (angle correction)
* [ ] Change angle on pad impact location
* [ ] Change angle on tile impact location
* [ ] Curved (bonus)

## Bonus
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
