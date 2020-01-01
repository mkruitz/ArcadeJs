# ArcadeJs

A game like [TRAZ](https://en.wikipedia.org/wiki/TRAZ) , which is a [Arkanoid](https://nl.wikipedia.org/wiki/Arkanoid) clone.

Using [CraftyJS](http://craftyjs.com/) inspired by https://speedlazer.net/ @ [Github](https://github.com/speedlazer)

# Road map

Progress game functionality

#### Basic level components
* [x] Wall [surround level]
* [x] Pad  [1x6]
* [x] Ball  [1x1 , angle in angle ou, straight line, single speed]
* [x] Tile solid [1x2, color, clear never]
* [x] Tile standard [1x2, color, clear 1 hit]
* [x] Pid [kill ball]

#### Basic level playStart
* [x] Win when all none solid tiles cleared 
* [x] Lives [3 lives, deduct 1 life on ball kill]
* [x] Restart

#### Play enhanced
* [x] Bonus - pad increase
* [ ] Score for tile hit/clear
* [x] Level (level definition format and loader)
* [x] Multi levels
* [ ] Vertical pad/pid

#### Traz levels
* [x] Pid/pad locations 
* [x] Multi pad
* [x] Multi pid
* [ ] Team Dual player mode

#### Traz game
* [ ] Navigate levels 

  

# Features

Extend variations after road map introduced first variant

#### Tiles
* [x] Solid
* [x] Single hit
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
* [x] Increase pad size [max size is pid size]
* [x] Decrease pad size [min size is half standard size]
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

To start developing default node project commands:

```
npm install
npm run serve
```

#### Tips & Tricks

Use levels.js file config settings `GameDemoMode` and `GameLevels` to page through levels or set debug level sequence.


# Resources used

* Color: ???
* Art: https://opengameart.org/
* CraftyJs
  * [Intro with older version](http://buildnewgames.com/introduction-to-crafty/)
  * [Beyond the basics](https://code.tutsplus.com/series/crafty-beyond-the-basics--cms-1132)
