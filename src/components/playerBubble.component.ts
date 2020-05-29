import { ImageConstants } from "../constants/image.constants"

export default class PlayerBubbleComponent extends Phaser.Physics.Arcade.Sprite {
  public hasKey: boolean = false;
  
  constructor(scene: Phaser.Scene, player: PlayerData) {
    super(scene, player.width, player.height, ImageConstants.GameTexture, 'think-bubble')
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setSize(player.width, player.height)
    // this.scene = scene
    this.setOffset(0.4, 0);
    //     this.setSize(21, 35)
    // // this.setPosition
    this.scale = 1.5;
    this.setBounce(0.2)
    this.setCollideWorldBounds(true)


    this.setVisible(true)

    // this.setOrigin(0, 1)
    // this.setDragX(500)
    // this.body.setSize(70, 132)
    // this.body.setOffset(25, 24)
  }
}