GameElement = {
  Ball: "Ball",
  ScoreObject: "ScoreObject",
  DeadlyObject: "Pid"
}

GameEvent = {
  DeadlyHit: "DeadlyHit",
  Score: "Score",
  LifeEvent: "LifeEvent",
  LevelComplete: "LevelComplete" ,
  LevelFail: "LevelFailed" 
}

LifeEvent = {
    Dead: "Dead",
    NewLife: "NewLife" 
}

ElementCode = {
  Solid: '0',
  Passthrough: '1',
  Pad: '2',
  Ball: '3',
  Bonus: '4',
  Tile: '5'
}

ElementCodeSolid = {
  Brick: '0',
  Pid: '1',
  Spacebox: '2'
}

ElementTile = {
  Horizontal: '0',
  Vertical: '1'
}
