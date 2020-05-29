import { ImageConstants } from "../constants/image.constants";

export default class InventoryKey extends Phaser.GameObjects.Sprite {
  constructor(private _scene: Phaser.Scene) {
    super(_scene, _scene.cameras.main.width - 220, 35, ImageConstants.GameTexture, "key")
    this.setOrigin(1, 0).setScrollFactor(0);
    this.setScale(0.75);
    _scene.add.existing(this);
    this.setVisible(false);
  }

  show(show: boolean) {
    this.setVisible(show);
  }


  adjustPosition() {
    this.x = this._scene.cameras.main.width - 220
    this.y = 35
  }
}