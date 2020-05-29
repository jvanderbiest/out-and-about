import { ImageConstants } from "../constants/image.constants"

export default class BackgroundComponent extends Phaser.GameObjects.TileSprite {
  order: number;

  constructor(scene: Phaser.Scene, backgroundResource: string, order: number) {
    super(scene, 0, 0, 0, 0, backgroundResource)
    scene.add.existing(this)
    this.alpha = 0.8;
    this.setOrigin(0, 0);
    this.setScrollFactor(0);
    this.order = order;
  }

  updateParallax() {
    if (this.scene) {
    this.tilePositionX = this.scene.cameras.main.scrollX * (0.01 * this.order);
  }
  }
}