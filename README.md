# ArcadeJs

A game like [TRAZ](https://en.wikipedia.org/wiki/TRAZ) , which is a [Arkanoid](https://nl.wikipedia.org/wiki/Arkanoid) clone.

Inspired by https://speedlazer.net/ @ [Github](https://github.com/speedlazer) using [CraftyJS](http://craftyjs.com/) 

# Road map

Progress game functionality

#### Basic level components
* [ ] Wall [surround level]
* [ ] Pad  [1x6]
* [ ] Ball  [1x1 , angle in angle ou, straight line, single speed]
* [ ] Tile solid [1x2, color, clear never]
* [ ] Tile standard [1x2, color, clear 1 hit]
* [ ] Pid [kill ball]

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

#### Requirements

* Node.JS

#### Developing

<todo>

# Resources used

* Art: https://opengameart.org/

  
