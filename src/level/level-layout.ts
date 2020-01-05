export class LevelLayout 
{
    colums : any;
    rows : any;
    tile : any;

    width() { return this.colums * this.tile.width;  }
    height() { return this.rows * this.tile.height;  }
    coordX(x: integer) { return x * this.tile.width;  }
    coordY(y: integer) { return y * this.tile.height;  }
    midX() { return this.width() /2; }
    midY() { return this.height() /2; }

    constructor(dimensions: any) {
      this.colums = dimensions.width;
      this.rows = dimensions.height

      this.tile = {
        width: dimensions.tile.width,
        height: dimensions.tile.heigth
      }
    }
}
