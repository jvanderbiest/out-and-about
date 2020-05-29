export default class TileComponent extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
      super(scene, x, y, texture, frame)
      this.setOrigin(0, 0)
  
      console.log(`drawing x: ${x}, y: ${y}, frame: ${frame}`)
      scene.add.existing(this)
      scene.physics.add.existing(this, true)
  
    }
  }