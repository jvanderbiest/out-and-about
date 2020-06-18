interface AddTile { (originalPositionData: TilePosition, x: number, y: number, frame: string, scale?: number): void }

export abstract class PositionCalculator {
  public static tile_size = 64;

  public static handle(gameHeight, gameWidth, positions: Array<TilePosition>, frame: string, add: AddTile) {
    positions.forEach(position => {

      var y = gameHeight - (position.y * this.tile_size) - (this.tile_size);

      if (position.xRange) {
        for (var count = 0; count <= position.xRange; count++) {
          var x = (position.x * this.tile_size) + (count * this.tile_size);
          var yForXRange = y;
          if (position.xOffset) {
            x += position.xOffset
          }
          if (position.yOffset) {
            yForXRange += position.yOffset;
          }

          add(position, x, yForXRange, frame, position.scale);

          if (position.xSkip) {
            count += position.xSkip;
          }
        }
      }
      else if (position.yRange) {
        for (var count = 0; count <= position.yRange; count++) {
          var y = gameHeight - (position.y * this.tile_size) - (count * this.tile_size);
          var xForYRange = position.x* this.tile_size;
          if (position.xOffset) {
            xForYRange += position.xOffset
          }
          if (position.yOffset) {
            y += position.yOffset;
          }

          add(position, xForYRange, y, frame, position.scale);

          if (position.ySkip) {
            count += position.ySkip;
          }
        }
      }
      else {
        x = (position.x * this.tile_size);
        if (position.xOffset) {
          x += position.xOffset
        }
        if (position.yOffset) {
          y += position.yOffset;
        }
        add(position, x, y, frame);
      }
    })
  }
}