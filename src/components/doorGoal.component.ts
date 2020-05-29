import { ImageConstants } from "../constants/image.constants"

export default class DoorGoalSprite extends Phaser.Physics.Arcade.Sprite {
    private _loadNextLevel: boolean = false
    constructor(scene: Phaser.Scene) {
      super(scene, 2020, 768, ImageConstants.GameTexture, 'door')
      scene.add.existing(this)
      scene.physics.add.existing(this)
  this.setScale(0.6);
      this.setImmovable(true)
      // @ts-ignore
      this.body.setAllowGravity(false)
      this.setOrigin(0, 0.5)
    }
  
    unlockDoor() {
        console.log("door unlocked")
this.scene.cameras.main.shake(2000);
    }
    // get loadNextLevel() {
    //   return this._loadNextLevel
    // }
  
    // nextLevel(scene: Phaser.Scene, level: number) {
    //   if (this._loadNextLevel) return
    //   this._loadNextLevel = true
  
    //   scene.cameras.main.fadeOut()
    //   scene.time.addEvent({
    //     delay: 2000,
    //     callback: () => {
    //       scene.scene.restart({ level: level += 1 })
    //     }
    //   })
    // }
  }