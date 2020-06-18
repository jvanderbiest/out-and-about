import { ImageConstants } from "../constants/image.constants"

export default class DoorKeySprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 620, 268, ImageConstants.GameTexture, 'key')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setScale(0.5);
    this.setImmovable(true)
    // @ts-ignore
    this.body.setAllowGravity(false)
    this.setOrigin(0, 0.5)
  }

  pickup() {
    this.destroy();
  }
}