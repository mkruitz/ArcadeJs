import { ElementCode, ElementCodeSolid, ElementTile } from './level-definition';

export class LevelLayout 
{
    colums : any;
    rows : any;
    tile : any;

    constructor(dimensions: any) {
      this.colums = dimensions.width;
      this.rows = dimensions.height

      this.tile = {
        width:  10,
        height: 10
      }
    }
    
    width() { return this.colums * this.tile.width;  }
    height() { return this.rows * this.tile.height;  }
    coordX(x: integer) { return x * this.tile.width;  }
    coordY(y: integer) { return y * this.tile.height;  }
    midX() { return this.width() /2; }
    midY() { return this.height() /2; }
}

export class LevelElement 
{
  colums : integer;
  rows : integer;
  type : string;
  subType: string;;
  colorCode: string;;
  count: string;;
  
  constructor(code: any) {
    this.colums = parseInt(code[0],10);
    this.rows = parseInt(code[1],10);
    this.type = code[2];
    this.subType = code[3];
    this.colorCode = code[4];
    this.count = code[5];
  }
  
  spriteCode() 
  {
      if(this.type === ElementCode.Solid)
      {
        if(this.subType === ElementCodeSolid.Brick) return "tile_solid";
        if(this.subType === ElementCodeSolid.Pid) return "tile_pid";
        if(this.subType === ElementCodeSolid.Spacebox) return "tile_box";
      }
  
      if(this.type === ElementCode.Passthrough) return "tile_mirror";  
      
      if(this.type === ElementCode.Tile)
      {
        let direction = "x";
        if(this.subType === ElementTile.Horizontal) direction = "h"; 
        if(this.subType === ElementTile.Vertical) direction = "v"; 
  
  
        let code = "tile_" + direction + "_single_" + this.colorCode;
        return code;
      }
      console.log("UnkownType", this.type, this.subType );
      return "";
  }

  isSolid() 
  {
    return  this.type === ElementCode.Solid || this.type === ElementCode.Tile;
  }

  isRemovable() 
  {
    return this.type === ElementCode.Tile;
  }
  
  isDeadly() 
  {
    return this.type === ElementCode.Solid && this.subType === ElementCodeSolid.Pid;
  }
}
