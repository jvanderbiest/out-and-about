import { ImageConstants } from "../constants/image.constants"
import TileDebugComponent from "./tileDebug.component"
import TileComponent from "./tile.component";
import { PositionCalculator } from "../helpers/positionCalculator";


export default class TileGroupDebugComponent extends Phaser.GameObjects.Group {

  addTile = (x: number, y: number, frame: string) => {
    this.add(new TileComponent(this.scene, x, y, ImageConstants.GameTexture, frame));
  }

  constructor(scene: Phaser.Scene, gameHeight: number, gameWidth: number, tiles: TileDetail[]) {
    super(scene)
    const tile_size = 64;

    tiles.forEach(tile => {
      PositionCalculator.handle(gameHeight, gameWidth, tile.positions, tile.frame, this.addTile)
    });

    var debug: boolean;
    // debug = true;

    if (debug) {
      var totalHeightSquares = gameHeight / tile_size;
      var totalWidthSquares = gameWidth / tile_size;
      for (var i = 0; i < totalHeightSquares; i++) {
        for (var j = 0; j < totalWidthSquares; j++) {
          var y = gameHeight - (i * tile_size) - (tile_size / 2);
          var x = 0 + (j * tile_size);

          const rect = this.scene.add.rectangle(x + tile_size / 2, y, tile_size, tile_size, 0xff0000, 0.2);
          rect.setStrokeStyle(1)
          var textElement = this.scene.add.text(x, y, j + "," + i, {});
        }
      }
    }

  }
}