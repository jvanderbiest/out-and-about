import TileComponent from "./tile.component"
import { ImageConstants } from "../constants/image.constants"

export default class TileGroupComponent extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene, platformMetaData: platformMetaData) {
    super(scene)

    // platformObjects.forEach(tile => {
    //   if (tile.predefined) {
    //     if (tile.predefined == 'rocky-alt') {
    //       var times = tile.predefinedRepeatX ?? 1;
    //       for (var i = 0; i < times; i++) {
    //         var image = i % 2 == 0 ? ImageConstants.Rocky02 : ImageConstants.Rocky04;
    //         this.add(new TileComponent(scene, tile.x + (i * 96), tile.y, ImageConstants.GameTexture, image));
    //       }
    //     }
    //   }
    //   else if (tile.stretchX) {
    //     var x = 0;
    //     var times = Math.floor((platformMetaData.levelWidth - tile.stretchXOffset) / (tile.stretchX)) + 1;
    //     for (var i = 0; i <= times; i++) {
    //       this.add(new TileComponent(scene, tile.stretchXOffset + tile.stretchX * i, tile.y, ImageConstants.GameTexture, tile.frame))
    //     }
    //   }
    //   else {
    //     this.add(new TileComponent(scene, tile.x, tile.y, ImageConstants.GameTexture, tile.frame))
    //   }
    // })
  }
}