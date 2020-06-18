import { ImageConstants } from "../constants/image.constants"
import Controls from "./controls.component"

export default class PlayerComponent extends Phaser.Physics.Arcade.Sprite {
  private _dead: boolean = false
  private _halt: boolean = false
  public hasKey: boolean = false;

  constructor(scene: Phaser.Scene, player: PlayerData) {
    super(scene, player.width, player.height, player.texture)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setSize(player.width - 10, player.height)
    this.setOffset(5, 0);
    this.setPosition(60, 0)
    this.scale = 1.5;
    this.setBounce(0.2)
    this.setCollideWorldBounds(true)

    this.scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 1, end: 8, prefix: 'run' }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNames(ImageConstants.GameTexture,
        { start: 1, end: 12, prefix: 'idle' }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNames(ImageConstants.GameTexture, { start: 0, end: 3, prefix: 'jump' }),
      frameRate: 10,
      repeat: 1
    })

    this.play('idle')

    this.setVisible(true)

    // this.setOrigin(0, 1)
    // this.setDragX(500)
    // this.body.setSize(70, 132)
    // this.body.setOffset(25, 24)
  }

  _isHurting: boolean;

  showKeyBubble() {
    var image = this.scene.add.image(this.x, this.y, ImageConstants.GameTexture, 'think-bubble');

    // text.setScrollFactor(0);
  }

  hurt(): boolean {
    // this._dead = true
    if (!this._isHurting) {
      this._isHurting = true;
   
      var x = 100;
      if (this.body.velocity.x > 0) {
        x = -x;
      }

      this.scene.tweens.add({
        targets: this,
        x: '+=' + x,
        duration: 200,
        repeat: 0
      });

      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        ease: 'Cubic.easeOut',
        duration: 100,
        repeat: 4,
        yoyo: true,
        onComplete: () => this._isHurting = false
      });

      return true;
    }
    console.log("player got not hurt, _isHurting " + this._isHurting);
    return false;
  }

  killEnemy() {
    this.setVelocityY(-600)
  }

  halt() {
    this.body.enable = false
    this._halt = true
  }


  // coordinates: coordinate[] = new Array<coordinate>();

  // setGhost() {
  //   this.isGhostMode = true;
  //   this.setAlpha(0.5);
    
  // }

  // _currentDelay: number;

//   onReplayEvent() {
//     var current = this.coordinates[0];
    
//     while (this.scene.time.now - current.sceneTime > current.sceneTime) {
//       this.setX(current.x);
//       this.setY(current.y);
//       this.coordinates.shift();
//       current = this.coordinates[0];
//     }
//   }
  
//   isGhostMode: boolean;
// if (this.isGhostMode) {
//   this.onReplayEvent();
//   return;
// }

  update(cursors: any, controls: Controls) {

// if (cursors.shift.isDown) {
//   this.setGhost();
// }

    if (cursors.left.isDown || controls.leftIsDown) {
      this.setVelocityX(-250);
      this.setFlipX(true);
      this.anims.play('run', true)
    }
    else if (cursors.right.isDown || controls.rightIsDown) {
      this.setVelocityX(250)
      this.setFlipX(false);

      this.anims.play('run', true)
    }
    else {
      this.setVelocityX(0)
      this.anims.play('idle', true)
    }

    if ((cursors.up.isDown || cursors.space.isDown || controls.upIsDown) && (this.body.blocked.down)) {
      this.setVelocityY(-700)
      this.anims.play('jump', true, 0);
    }
    
      // this.coordinates.push({ sceneTime: this.scene.time.now, x: this.x, y: this.y });
  }
}

// export interface coordinate {
//   sceneTime: number;
//   x: number;
//   y: number;
// }