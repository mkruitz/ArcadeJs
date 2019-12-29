# ArcadeJs

Game like [TRAZ](https://en.wikipedia.org/wiki/TRAZ)  which is a [Arkanoid](https://nl.wikipedia.org/wiki/Arkanoid) clone.

# Roadmap

Progres game functionatilty

## Basic level components
* [x] Wall [surround level]
* [x] Pad  [1x6]
* [x] Ball  [1x1 , angle in angle ou, straight line, single speed]
* [ ] Tile solid [1x2, color, clear never]
* [ ] Tile standard [1x2, color, clear 1 hit]
* [ ] Pid [kill Ball]

## Basic level playStart
* [ ] Win all none solid tiles cleared 
* [ ] Lives [3, deduct 1on ball kill]
* [ ] Restart

## Play enhanced
* [ ] Bonus - pid [pid as solid, 5 sec]
* [ ] Score for Tile hit/clear
* [ ] Level [definition and loader]
* [ ] Multi levels

## Traz levels
* [ ] Pid/pad locations 
* [ ] Multi pad
* [ ] Multi pid
* [ ] Team Dual player mode

## Traz game
* [ ] Navigate levels 

# Features

Extend variations after roadmap introduced first variant

## Tiles
* [ ] Solid
* [ ] Single hit
* [ ] Multi hit
* [ ] Mirror [2x2, change Ball direction]
* [ ] Large shot special behaviour

## Ball
* [ ] Standard movement
* [ ] Avoid stuck (angle correction)
* [ ] Change angle on pad impact location
* [ ] Change angle on tile impact location
* [ ] Curved (bonus)

## Bonus
* [ ] Pid as solid
* [ ] Extra live
* [ ] Increase pad [max is pid size]
* [ ] Decrease pad size [min is halve standard size]
* [ ] Shot single [large, 5x , hit coun 10]
* [ ] Shot dual [small, 5 sec, hit count 1]
* [ ] Ball multi [1-2]
* [ ] Ball increase speed [max 3x standard]
* [ ] Ball decrease speed [max 1/2 standard]
* [ ] Ball curbed
